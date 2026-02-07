import { fail } from "@sveltejs/kit";

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
			isAuthenticated: false,
			user: null,
			session: null,
			googleEnabled: false
		};
	}

	try {
		const env = event.platform.env as AuthEnv;
		const auth = createAuth(env, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		return {
			isAuthenticated: Boolean(session?.user),
			user: session?.user ?? null,
			session: session?.session ?? null,
			googleEnabled: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
		};
	} catch (error) {
		console.error("[home] Failed to load auth session", error);
		return {
			isAuthenticated: false,
			user: null,
			session: null,
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
		const email = String(formData.get("email") ?? "")
			.trim()
			.toLowerCase();

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
					callbackURL: "/",
					errorCallbackURL: "/"
				}
			});
		} catch (error) {
			return fail(400, {
				status: "error",
				message: asMessage(error),
				email
			});
		}

		return {
			status: "success",
			message: `Magic link sent to ${email}.`,
			email
		};
	}
};
