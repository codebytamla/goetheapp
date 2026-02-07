<script lang="ts">
	import { Progress, Separator } from "bits-ui";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const readiness = 62;

	const moduleReadiness = [
		{ name: "Lesen", value: 71, accent: "reading" },
		{ name: "Hören", value: 68, accent: "listening" },
		{ name: "Schreiben", value: 64, accent: "writing" },
		{ name: "Sprechen", value: 59, accent: "speaking" }
	];

	const recentActivity = [
		{ module: "Lesen", step: "Teil 2: Zeitungsartikel", when: "2h ago", result: "85%" },
		{ module: "Hören", step: "Teil 1: Ansagen", when: "Yesterday", result: "72%" },
		{ module: "Sprechen", step: "Teil 2: Präsentation", when: "2 days ago", result: "Reviewed" }
	];
</script>

<div class="app-container">
	<nav class="nav">
		<div class="nav-brand">
			<span class="nav-logo">DE</span>
			<span class="nav-title">Goethe Trainer</span>
		</div>
		<div class="nav-links">
			<a href="/" class="nav-link">Dashboard</a>
			<a href="/progress" class="nav-link active">Progress</a>
			<a href="/mock-exam" class="nav-link">Mock Exam</a>
		</div>
		<div class="nav-user">
			<span class="nav-user-name">{data.user?.name ?? data.user?.email?.split("@")[0] ?? "Learner"}</span>
			<a href="/auth" class="btn btn-ghost">Account</a>
		</div>
	</nav>

	<header class="header">
		<p class="eyebrow">Exam Readiness</p>
		<h1>Progress Center</h1>
		<p>Track your previous practice steps and readiness score in one place.</p>
	</header>

	<section class="readiness-card">
		<div class="readiness-top">
			<div>
				<h2>Overall Readiness</h2>
				<p>Current confidence estimate for full Goethe placement simulation.</p>
			</div>
			<strong>{readiness}%</strong>
		</div>
		<Progress.Root class="readiness-bar" value={readiness} max={100} aria-label="Overall readiness">
			<div class="readiness-fill" style={`width:${readiness}%`}></div>
		</Progress.Root>
	</section>

	<Separator.Root decorative class="section-divider" />

	<section class="grid">
		<article class="card">
			<h2>Module Breakdown</h2>
			<ul>
				{#each moduleReadiness as item}
					<li>
						<div class="row-head">
							<span>{item.name}</span>
							<strong>{item.value}%</strong>
						</div>
						<Progress.Root class="module-bar" value={item.value} max={100} aria-label={`${item.name} readiness`}>
							<div class={`module-fill ${item.accent}`} style={`width:${item.value}%`}></div>
						</Progress.Root>
					</li>
				{/each}
			</ul>
		</article>

		<article class="card">
			<h2>Previous Practice Steps</h2>
			<ul class="timeline">
				{#each recentActivity as item}
					<li>
						<div>
							<p class="step-title">{item.module}: {item.step}</p>
							<p class="step-meta">{item.when}</p>
						</div>
						<span class="step-result">{item.result}</span>
					</li>
				{/each}
			</ul>
		</article>
	</section>
</div>

<style>
	.app-container {
		min-height: 100vh;
		padding: var(--space-lg);
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		padding: var(--space-md) var(--space-lg);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		margin-bottom: var(--space-xl);
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.nav-logo {
		font-size: 0.82rem;
		padding: 0.2rem 0.4rem;
		background: var(--bg-elevated);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
	}

	.nav-title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.125rem;
	}

	.nav-links {
		display: flex;
		gap: var(--space-xs);
	}

	.nav-link {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-weight: 500;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: var(--bg-elevated);
	}

	.nav-link.active {
		color: var(--text-primary);
		background: var(--bg-elevated);
	}

	.nav-user {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.nav-user-name {
		font-weight: 500;
		color: var(--text-secondary);
	}

	.header h1 {
		margin-top: var(--space-xs);
	}

	.header p {
		margin-top: var(--space-sm);
	}

	.eyebrow {
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.readiness-card {
		margin-top: var(--space-lg);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
	}

	.readiness-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.readiness-top h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.readiness-top p {
		margin-top: 0.25rem;
	}

	.readiness-top strong {
		font-size: 2.3rem;
		font-family: var(--font-heading);
		color: var(--speaking-primary);
	}

	.readiness-bar {
		margin-top: var(--space-md);
		height: 10px;
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.readiness-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--speaking-primary), var(--speaking-secondary));
		border-radius: var(--radius-full);
	}

	.section-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-xl) 0;
		border: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-lg);
	}

	.card {
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
	}

	.card h2 {
		font-size: 1.3rem;
		margin-bottom: var(--space-md);
	}

	.card ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--space-md);
	}

	.row-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-sm);
	}

	.module-bar {
		height: 8px;
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.module-fill {
		height: 100%;
		border-radius: var(--radius-full);
	}

	.module-fill.reading {
		background: linear-gradient(90deg, var(--reading-primary), var(--reading-secondary));
	}

	.module-fill.listening {
		background: linear-gradient(90deg, var(--listening-primary), var(--listening-secondary));
	}

	.module-fill.writing {
		background: linear-gradient(90deg, var(--writing-primary), var(--writing-secondary));
	}

	.module-fill.speaking {
		background: linear-gradient(90deg, var(--speaking-primary), var(--speaking-secondary));
	}

	.timeline li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.step-title {
		color: var(--text-primary);
		font-weight: 600;
	}

	.step-meta {
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	.step-result {
		color: var(--speaking-secondary);
		font-weight: 700;
	}

	@media (max-width: 880px) {
		.nav {
			flex-direction: column;
			align-items: flex-start;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
