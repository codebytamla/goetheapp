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
			authError: "Auth runtime is unavailable."
		};
	}

	try {
		const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		return {
			user: session?.user ?? null,
			session: session?.session ?? null,
			authError: event.url.searchParams.get("error")
		};
	} catch (err) {
		console.error("[auth] getSession failed", err);
		return {
			user: null,
			session: null,
			authError: asMessage(err)
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
	}
};
