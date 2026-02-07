<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Magic Link Auth</h1>
<p>Sign in with an emailed magic link.</p>

{#if data.authError}
	<p class="error">Auth error: {data.authError}</p>
{/if}

{#if form?.message}
	<p class={form.status === 'error' ? 'error' : 'success'}>{form.message}</p>
{/if}

{#if data.user}
	<p><strong>Signed in:</strong> {data.user.email}</p>

	<form method="POST" action="?/signOut">
		<button type="submit">Sign out</button>
	</form>
{:else}
	<form method="POST" action="?/signInGoogle">
		<button type="submit" disabled={!data.googleEnabled}>
			Continue with Google
		</button>
	</form>

	{#if !data.googleEnabled}
		<p class="hint">
			Set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> to enable Google sign-in.
		</p>
	{/if}

	<form method="POST" action="?/requestMagicLink">
		<label for="email">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			value={form?.email ?? ''}
			required
		/>
		<button type="submit">Send magic link</button>
	</form>

	<p class="hint">
		If <code>RESEND_API_KEY</code> is not configured, the magic link is logged in Worker logs.
	</p>
{/if}

<style>
	form {
		display: grid;
		gap: 0.75rem;
		max-width: 22rem;
		margin: 1rem 0;
	}

	input,
	button {
		font: inherit;
		padding: 0.6rem 0.75rem;
	}

	.success {
		color: #0b6b2f;
	}

	.error {
		color: #9b1c1c;
	}

	.hint {
		font-size: 0.95rem;
		opacity: 0.8;
	}
</style>
