import { getRequestEvent } from "$app/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins/magic-link";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { drizzle } from "drizzle-orm/d1";

import { authSchema } from "./auth-schema";

const FALLBACK_AUTH_SECRET =
	"change-me-before-production-2fce3868cfd349f0a7162859634de1f5";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

export type AuthEnv = Env & {
	BETTER_AUTH_SECRET?: string;
	RESEND_API_KEY?: string;
	AUTH_FROM_EMAIL?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
	SEND_EMAIL?: {
		send: (message: {
			to: Array<{ email: string }>;
			from: { email: string; name?: string };
			subject: string;
			text?: string;
			html?: string;
		}) => Promise<void>;
	};
};

async function sendMagicLinkEmail(env: AuthEnv, email: string, url: string): Promise<void> {
	if (env.SEND_EMAIL?.send) {
		await env.SEND_EMAIL.send({
			to: [{ email }],
			from: { email: env.AUTH_FROM_EMAIL ?? DEFAULT_FROM_EMAIL, name: "Goethe App" },
			subject: "Your sign-in link",
			text: `Sign in with this link: ${url}`,
			html: `<p>Sign in by clicking this link:</p><p><a href="${url}">${url}</a></p>`
		});
		return;
	}

	if (!env.RESEND_API_KEY) {
		console.log(`[auth] Magic link for ${email}: ${url}`);
		return;
	}

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: env.AUTH_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
			to: email,
			subject: "Your sign-in link",
			html: `<p>Sign in by clicking this link:</p><p><a href="${url}">${url}</a></p>`
		})
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`Failed to send magic link email: ${details}`);
	}
}

export function createAuth(env: AuthEnv, baseURL: string) {
	const db = drizzle(env.DB, { schema: authSchema });
	const googleEnabled = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);

	return betterAuth({
		baseURL,
		basePath: "/api/auth",
		secret: env.BETTER_AUTH_SECRET ?? FALLBACK_AUTH_SECRET,
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema: authSchema
		}),
		emailAndPassword: {
			enabled: false
		},
		socialProviders: googleEnabled
			? {
					google: {
						clientId: env.GOOGLE_CLIENT_ID as string,
						clientSecret: env.GOOGLE_CLIENT_SECRET as string
					}
				}
			: undefined,
		plugins: [
			sveltekitCookies(getRequestEvent),
			magicLink({
				expiresIn: 60 * 15,
				sendMagicLink: async ({ email, url }) => {
					await sendMagicLinkEmail(env, email, url);
				}
			})
		]
	});
}
