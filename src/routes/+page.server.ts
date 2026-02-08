import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { createAuth, type AuthEnv } from "$lib/server/auth";
import { userPreference } from "$lib/server/user-preference-schema";

import type { Actions, PageServerLoad } from "./$types";

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type CefrLevel = (typeof CEFR_LEVELS)[number];
const DEFAULT_CEFR_LEVEL: CefrLevel = "B1";

function isCefrLevel(value: string): value is CefrLevel {
	return CEFR_LEVELS.includes(value as CefrLevel);
}

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
			googleEnabled: false,
			selectedLevel: DEFAULT_CEFR_LEVEL
		};
	}

	const env = event.platform.env as AuthEnv;
	const googleEnabled = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);

	try {
		const auth = createAuth(env, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});
		const db = drizzle(env.DB);
		let selectedLevel: CefrLevel = DEFAULT_CEFR_LEVEL;

		if (session?.user?.id) {
			try {
				const [preference] = await db
					.select({ cefrLevel: userPreference.cefrLevel })
					.from(userPreference)
					.where(eq(userPreference.userId, session.user.id))
					.limit(1);

				if (preference?.cefrLevel && isCefrLevel(preference.cefrLevel)) {
					selectedLevel = preference.cefrLevel;
				}
			} catch (error) {
				console.error("[home] Failed to load user preferences", error);
			}
		}

		return {
			isAuthenticated: Boolean(session?.user),
			user: session?.user ?? null,
			session: session?.session ?? null,
			googleEnabled,
			selectedLevel
		};
	} catch (error) {
		console.error("[home] Failed to load auth session", error);
		return {
			isAuthenticated: false,
			user: null,
			session: null,
			googleEnabled,
			selectedLevel: DEFAULT_CEFR_LEVEL
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
	},
	updateLevel: async (event) => {
		if (!event.platform?.env) {
			return fail(500, {
				levelStatus: "error",
				levelMessage: "Preferences runtime is unavailable."
			});
		}

		const env = event.platform.env as AuthEnv;
		const auth = createAuth(env, event.url.origin);
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user?.id) {
			return fail(401, {
				levelStatus: "error",
				levelMessage: "You need to sign in to set your level."
			});
		}

		const formData = await event.request.formData();
		const level = String(formData.get("level") ?? "")
			.trim()
			.toUpperCase();

		if (!isCefrLevel(level)) {
			return fail(400, {
				levelStatus: "error",
				levelMessage: "Invalid CEFR level."
			});
		}

		const db = drizzle(env.DB);
		const now = new Date();

		try {
			await db
				.insert(userPreference)
				.values({
					userId: session.user.id,
					cefrLevel: level,
					createdAt: now,
					updatedAt: now
				})
				.onConflictDoUpdate({
					target: userPreference.userId,
					set: {
						cefrLevel: level,
						updatedAt: now
					}
				});
		} catch (error) {
			console.error("[home] Failed to update user preferences", error);
			return fail(500, {
				levelStatus: "error",
				levelMessage:
					"Could not save your level. The user_preference migration may be missing."
			});
		}

		return {
			levelStatus: "success",
			selectedLevel: level
		};
	}
};
