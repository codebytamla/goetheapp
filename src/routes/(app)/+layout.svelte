<script lang="ts">
	import AppNav from "$lib/components/AppNav.svelte";
	import type { LayoutData } from "./$types";

	let { data, children }: { data: LayoutData; children: import("svelte").Snippet } = $props();
</script>

<div class="app-shell">
	<AppNav user={data.user} />
	<main class="app-content">
		{@render children()}
	</main>
</div>

<style>
	.app-shell {
		min-height: 100vh;
		background: var(--bg-primary);
		padding-bottom: var(--space-2xl);
	}

	.app-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}
</style>
