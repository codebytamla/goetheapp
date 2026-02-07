import { redirect } from "@sveltejs/kit";

import { createAuth, type AuthEnv } from "$lib/server/auth";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	if (!event.platform?.env) {
		throw redirect(303, "/auth");
	}

	const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (!session?.user) {
		throw redirect(303, "/auth");
	}

	return {
		user: session.user
	};
};
