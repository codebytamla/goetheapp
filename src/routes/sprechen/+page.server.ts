import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { createAuth, type AuthEnv } from "$lib/server/auth";
import { userPreference } from "$lib/server/user-preference-schema";

import type { PageServerLoad } from "./$types";

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type CefrLevel = (typeof CEFR_LEVELS)[number];
const DEFAULT_CEFR_LEVEL: CefrLevel = "B1";

function isCefrLevel(value: string): value is CefrLevel {
	return CEFR_LEVELS.includes(value as CefrLevel);
}

export const load: PageServerLoad = async (event) => {
	if (!event.platform?.env) {
		return { selectedLevel: DEFAULT_CEFR_LEVEL };
	}

	const env = event.platform.env as AuthEnv;
	const auth = createAuth(env, event.url.origin);
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (!session?.user?.id) {
		return { selectedLevel: DEFAULT_CEFR_LEVEL };
	}

	const db = drizzle(env.DB);
	try {
		const [preference] = await db
			.select({ cefrLevel: userPreference.cefrLevel })
			.from(userPreference)
			.where(eq(userPreference.userId, session.user.id))
			.limit(1);

		if (preference?.cefrLevel && isCefrLevel(preference.cefrLevel)) {
			return { selectedLevel: preference.cefrLevel };
		}
	} catch (error) {
		console.error("[sprechen] Failed to load user preferences", error);
	}

	return { selectedLevel: DEFAULT_CEFR_LEVEL };
};
