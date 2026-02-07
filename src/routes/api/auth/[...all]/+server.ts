import { error } from "@sveltejs/kit";
import { toSvelteKitHandler } from "better-auth/svelte-kit";

import { createAuth, type AuthEnv } from "$lib/server/auth";

import type { RequestHandler } from "./$types";

const handler: RequestHandler = async (event) => {
	if (!event.platform?.env) {
		throw error(500, "Cloudflare platform env is not available.");
	}

	const auth = createAuth(event.platform.env as AuthEnv, event.url.origin);
	return toSvelteKitHandler(auth)(event);
};

export const GET: RequestHandler = handler;
export const POST: RequestHandler = handler;
