<script lang="ts">
	import { page } from "$app/state";
	import { Languages, TrendingUp } from "@lucide/svelte";

	type NavUser = {
		name?: string | null;
		email?: string | null;
	};

	let { user }: { user?: NavUser | null } = $props();

	const getInitial = (name?: string | null, email?: string | null) => {
		if (name && name.length > 0) return name[0];
		if (email && email.length > 0) return email[0].toUpperCase();
		return "L";
	};
</script>

<nav class="app-nav">
	<div class="nav-brand">
		<div class="nav-logo-circle">
			<Languages size={20} aria-hidden="true" />
		</div>
		<span class="nav-title">Goethe Trainer</span>
	</div>
	<div class="nav-links">
		<a href="/" class:active={page.url.pathname === "/"} class="nav-link">Dashboard</a>
		<a href="/history" class:active={page.url.pathname === "/history"} class="nav-link">History</a>
		<a href="/progress" class:active={page.url.pathname === "/progress"} class="nav-link">Progress</a>
	</div>
	<div class="nav-user">
		<div class="user-streak">
			<TrendingUp size={16} style="color: #16a34a;" />
			<span>3 Day Streak</span>
		</div>
		<div class="nav-divider"></div>
		<a href="/auth" class="user-profile" aria-label="Open account">
			<div class="avatar">{getInitial(user?.name, user?.email)}</div>
		</a>
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem var(--space-lg);
		margin-bottom: var(--space-lg);
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

	.nav-links {
		display: flex;
		gap: 0.25rem;
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
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.user-streak {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-secondary);
		background: var(--bg-elevated);
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
	}

	.nav-divider {
		width: 1px;
		height: 24px;
		background: var(--border-default);
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

	@media (max-width: 768px) {
		.app-nav {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
