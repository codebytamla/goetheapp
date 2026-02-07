# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --install npm goetheapp
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## D1 Database

This project is bound to a Cloudflare D1 database named `goetheapp-db` with binding `DB`.

```sh
# create a new migration file
npm run db:migration:create -- add_feature_name

# apply migrations locally (for wrangler dev)
npm run db:migrate:local

# apply migrations remotely (Cloudflare D1)
npm run db:migrate:remote
```

## Magic Link Auth (Better Auth)

The app includes Better Auth magic-link sign-in at `/auth`.

Required secret in Cloudflare:

```sh
wrangler secret put BETTER_AUTH_SECRET
```

Optional email delivery via Cloudflare Email Service (if your account has access):

```sh
# Example binding name used by the app:
# SEND_EMAIL
```

Optional fallback email delivery via Resend:

```sh
wrangler secret put RESEND_API_KEY
wrangler secret put AUTH_FROM_EMAIL
```

Send order is:
1. `SEND_EMAIL` (Cloudflare Email Service binding, if present)
2. Resend (`RESEND_API_KEY`)
3. Worker log output (development fallback)

## Google Sign-In (Better Auth)

Set Google OAuth credentials:

```sh
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

In Google Cloud Console OAuth client settings, add redirect URIs:

```txt
https://goetheapp.maximusanderson.workers.dev/api/auth/callback/google
http://localhost:8787/api/auth/callback/google
```
