import { createAuth, type AuthEnv } from "$lib/server/auth";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.platform?.env) {
		return {
			isAuthenticated: false,
			user: null,
			session: null
		};
	}

	try {
		const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		return {
			isAuthenticated: Boolean(session?.user),
			user: session?.user ?? null,
			session: session?.session ?? null
		};
	} catch (error) {
		console.error("[home] Failed to load auth session", error);
		return {
			isAuthenticated: false,
			user: null,
			session: null
		};
	}
};
