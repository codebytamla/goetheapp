<script lang="ts">
	import { page } from "$app/state";
	import { Bird, Menu, X } from "@lucide/svelte";

	type NavUser = {
		name?: string | null;
		email?: string | null;
	};

	let { user }: { user?: NavUser | null } = $props();
	let mobileMenuOpen = $state(false);

	const getInitial = (name?: string | null, email?: string | null) => {
		if (name && name.length > 0) return name[0];
		if (email && email.length > 0) return email[0].toUpperCase();
		return "L";
	};

	const getDisplayName = (name?: string | null, email?: string | null) => {
		if (name && name.length > 0) return name;
		if (email && email.length > 0) return email.split("@")[0];
		return "Learner";
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	const closeMobileMenu = () => {
		mobileMenuOpen = false;
	};
</script>

<nav class="app-nav">
	<div class="nav-top-row">
		<div class="nav-brand">
			<div class="nav-logo-circle">
				<Bird size={20} aria-hidden="true" />
			</div>
			<span class="nav-title">Goethe Sim</span>
		</div>
		<button
			type="button"
			class="hamburger-btn"
			aria-expanded={mobileMenuOpen}
			aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
			onclick={toggleMobileMenu}
		>
			{#if mobileMenuOpen}
				<X size={18} />
			{:else}
				<Menu size={18} />
			{/if}
		</button>
	</div>

	<div class="nav-main" class:mobile-open={mobileMenuOpen}>
		<div class="nav-links">
			<a href="/" class:active={page.url.pathname === "/"} class="nav-link" onclick={closeMobileMenu}>Dashboard</a>
			<a href="/history" class:active={page.url.pathname === "/history"} class="nav-link" onclick={closeMobileMenu}>History</a>
			<a href="/progress" class:active={page.url.pathname === "/progress"} class="nav-link" onclick={closeMobileMenu}>Progress</a>
		</div>
		<div class="nav-user">
			<details class="profile-menu">
				<summary class="user-profile" aria-label="Open account menu">
					<div class="avatar">{getInitial(user?.name, user?.email)}</div>
				</summary>
				<div class="profile-dropdown">
					<p class="profile-name">{getDisplayName(user?.name, user?.email)}</p>
					{#if user?.email}
						<p class="profile-email">{user.email}</p>
					{/if}
					<a href="/auth" class="profile-link" onclick={closeMobileMenu}>Manage account</a>
					<form method="POST" action="/auth?/signOut">
						<button type="submit" class="profile-signout">Sign out</button>
					</form>
				</div>
			</details>
		</div>
	</div>
</nav>

<style>
	.app-nav {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-subtle);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		column-gap: var(--space-lg);
		padding: 0.75rem var(--space-lg);
		margin-bottom: var(--space-lg);
	}

	.nav-top-row {
		grid-column: 1;
		justify-self: start;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.nav-logo-circle {
		width: 36px;
		height: 36px;
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
	}

	.nav-title {
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: -0.01em;
	}

	.hamburger-btn {
		display: none;
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--border-subtle);
		background: var(--bg-card);
		color: var(--text-primary);
		border-radius: var(--radius-md);
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.hamburger-btn:hover {
		background: var(--bg-elevated);
	}

	.nav-main {
		display: contents;
	}

	.nav-links {
		grid-column: 2;
		justify-self: center;
		display: flex;
		gap: 0.25rem;
		justify-content: center;
	}

	.nav-link {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-secondary);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-sm);
		transition: all 0.2s;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-primary);
		background: var(--bg-elevated);
	}

	.nav-user {
		grid-column: 3;
		justify-self: end;
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 36px;
		height: 36px;
		background: #2563eb;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.profile-menu {
		position: relative;
	}

	.user-profile {
		display: flex;
		align-items: center;
		list-style: none;
		cursor: pointer;
	}

	.user-profile::-webkit-details-marker {
		display: none;
	}

	.profile-dropdown {
		position: absolute;
		top: calc(100% + 0.6rem);
		right: 0;
		width: 220px;
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		padding: var(--space-md);
		display: grid;
		gap: 0.5rem;
	}

	.profile-name {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.profile-email {
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-bottom: 0.2rem;
	}

	.profile-link,
	.profile-signout {
		font: inherit;
		font-size: 0.9rem;
		color: var(--text-secondary);
		background: transparent;
		border: none;
		padding: 0.45rem 0.5rem;
		border-radius: var(--radius-sm);
		text-align: left;
		cursor: pointer;
		width: 100%;
	}

	.profile-link:hover,
	.profile-signout:hover {
		background: var(--bg-elevated);
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.app-nav {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}

		.hamburger-btn {
			display: inline-flex;
		}

		.nav-main {
			display: none;
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-md);
			padding-top: var(--space-sm);
			border-top: 1px solid var(--border-subtle);
		}

		.nav-main.mobile-open {
			display: flex;
		}

		.nav-links {
			flex-direction: column;
			gap: var(--space-xs);
		}

		.nav-link {
			display: block;
		}

		.nav-user {
			width: 100%;
			justify-content: flex-end;
		}

		.profile-menu {
			max-width: 100%;
		}

		.profile-dropdown {
			position: static;
			width: 100%;
			max-width: 100%;
			margin-top: var(--space-sm);
		}
	}
</style>
