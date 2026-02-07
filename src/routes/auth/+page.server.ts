import { fail, redirect } from "@sveltejs/kit";

import { createAuth, type AuthEnv } from "$lib/server/auth";

import type { Actions, PageServerLoad } from "./$types";

function asMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	return "Unexpected error";
}

export const load: PageServerLoad = async (event) => {
	if (!event.platform?.env) {
		return {
			user: null,
			session: null,
			authError: "Auth runtime is unavailable.",
			googleEnabled: false
		};
	}

	try {
		const env = event.platform.env as AuthEnv;
		const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		return {
			user: session?.user ?? null,
			session: session?.session ?? null,
			authError: event.url.searchParams.get("error"),
			googleEnabled: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
		};
	} catch (err) {
		console.error("[auth] getSession failed", err);
		return {
			user: null,
			session: null,
			authError: asMessage(err),
			googleEnabled: false
		};
	}
};

export const actions: Actions = {
	requestMagicLink: async (event) => {
		if (!event.platform?.env) {
			return fail(500, {
				status: "error",
				message: "Auth runtime is unavailable."
			});
		}

		const formData = await event.request.formData();
		const email = String(formData.get("email") ?? "").trim().toLowerCase();

		if (!email) {
			return fail(400, {
				status: "error",
				message: "Email is required.",
				email
			});
		}

		try {
			const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
			await auth.api.signInMagicLink({
				headers: event.request.headers,
				body: {
					email,
					callbackURL: "/auth",
					errorCallbackURL: "/auth"
				}
			});
		} catch (err) {
			return fail(400, {
				status: "error",
				message: asMessage(err),
				email
			});
		}

		return {
			status: "success",
			message: `Magic link sent to ${email}.`,
			email
		};
	},
	signOut: async (event) => {
		if (!event.platform?.env) {
			return fail(500, {
				status: "error",
				message: "Auth runtime is unavailable."
			});
		}

		const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
		await auth.api.signOut({
			headers: event.request.headers
		});
		throw redirect(303, "/auth");
	},
	signInGoogle: async (event) => {
		if (!event.platform?.env) {
			return fail(500, {
				status: "error",
				message: "Auth runtime is unavailable."
			});
		}

		const env = event.platform.env as AuthEnv;
		if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
			return fail(400, {
				status: "error",
				message: "Google sign-in is not configured."
			});
		}

		const auth = createAuth(env, event.url.origin);
		const result = await auth.api.signInSocial({
			headers: event.request.headers,
			body: {
				provider: "google",
				callbackURL: "/auth",
				errorCallbackURL: "/auth",
				disableRedirect: true
			}
		});

		if (!("url" in result) || !result.url) {
			return fail(500, {
				status: "error",
				message: "Google sign-in did not return an authorization URL."
			});
		}

		throw redirect(302, result.url);
	}
};
