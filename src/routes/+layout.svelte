<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Goethe Prüfung Practice</title>
	<meta name="description" content="Master your Goethe exam with interactive practice modules for Reading, Listening, Writing, and Speaking." />
</svelte:head>

{@render children()}
