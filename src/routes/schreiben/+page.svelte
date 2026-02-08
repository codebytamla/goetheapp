<script lang="ts">
	import { ArrowLeft, ArrowRight, Clock3, FileText, PenTool } from "@lucide/svelte";
	import type { PageData } from "./$types";

	type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

	type WritingTeil = {
		id: string;
		name: string;
		title: string;
		description: string;
	};

	type WritingConfig = {
		totalTime: string;
		timeNote: string;
		teile: WritingTeil[];
	};

	let { data }: { data: PageData } = $props();

	const levelConfigs: Record<CefrLevel, WritingConfig> = {
		A1: {
			totalTime: "20 minutes",
			timeNote: "Very short tasks (form + short message)",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Fill in a form",
					description: "Complete core fields such as name, address, date, and other simple details."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Very short message",
					description: "Write a very short SMS, note, or email for a basic everyday situation."
				}
			]
		},
		A2: {
			totalTime: "30 minutes",
			timeNote: "2 short emails / messages",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short message or email",
					description: "Write a short message for an everyday purpose with clear practical information."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Slightly longer email",
					description: "Write a longer email for requests, invitations, apologies, or similar cases."
				}
			]
		},
		B1: {
			totalTime: "60 minutes",
			timeNote: "Email/letter + opinion text",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Informal or semi-formal email/letter",
					description: "Respond clearly to task points with suitable tone and coherent structure."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Opinion text",
					description: "Present personal experience and reasons with clear argument flow."
				}
			]
		},
		B2: {
			totalTime: "80 minutes",
			timeNote: "Formal text + argumentative essay",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Formal text",
					description: "Write a formal letter, complaint, or request with accurate register."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Argumentative text",
					description: "Discuss opinion, pros and cons, and conclude with a justified position."
				}
			]
		},
		C1: {
			totalTime: "80 minutes",
			timeNote: "Long structured texts with high language control",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Structured argumentative or analytical text",
					description: "Develop complex arguments with strong coherence and precise language use."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Formal task",
					description: "Complete a formal summary, report, or letter with controlled structure."
				}
			]
		},
		C2: {
			totalTime: "80 minutes",
			timeNote: "One very long, complex text (quality over speed)",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "One long complex text",
					description: "Write on an abstract topic with clear structure, style, nuance, and register."
				}
			]
		}
	};

	const getLevelConfig = (level: string): WritingConfig => {
		const typedLevel = level as CefrLevel;
		return levelConfigs[typedLevel] ?? levelConfigs.B1;
	};

	let levelConfig = $derived(getLevelConfig(data.selectedLevel));
</script>

<svelte:head>
	<title>Schreiben | Goethe Prüfung Practice</title>
	<meta name="description" content="Practice the writing module for your Goethe exam." />
</svelte:head>

<div class="app-shell">
	<main class="dashboard-content">
		<nav class="top-nav">
			<a href="/" class="back-link">
				<ArrowLeft size={16} />
			</a>
		</nav>

		<header class="dashboard-header">
			<div class="header-welcome">
				<div class="title-row">
					<h1>Schreiben</h1>
					<span class="level-text">{data.selectedLevel}</span>
				</div>
				<p>Write with exam structure and timing discipline, then run the full writing simulation.</p>
			</div>
			<a
				href="/schreiben/practice?mode=full&level={data.selectedLevel}"
				class="btn btn-secondary header-full-test-btn"
			>
				<span class="cta-play-icon" aria-hidden="true"></span>
				Full Writing Test
			</a>
		</header>

		<section class="time-rule-card" aria-label="Writing time by level">
			<div class="rule-head">
				<Clock3 size={16} />
				<h2>Writing Time By Level</h2>
			</div>
			<p class="time-total">Total allowed time: {levelConfig.totalTime}</p>
			<p class="time-rule">One total timer for all Teile. No fixed time per Teil.</p>
			<p class="time-note">{levelConfig.timeNote}</p>
		</section>

		<section class="teile-section">
			<div class="section-head">
				<h2>Practice by Teil</h2>
			</div>

			<div class="modules-grid">
				{#each levelConfig.teile as teil}
					<article class="module-widget">
						<div class="widget-header">
							<div class="widget-header-main">
								<div class="widget-icon writing">
									<PenTool size={20} />
								</div>
								<div class="widget-title">
									<h3>{teil.title}</h3>
									<span class="widget-subtitle">{teil.name}</span>
									<p class="teil-description">{teil.description}</p>
								</div>
							</div>
						</div>

						<div class="widget-footer">
							<span class="last-session">
								<FileText size={14} />
								Open response task
							</span>
							<a
								href="/schreiben/practice?mode=teil&teil={teil.id}&level={data.selectedLevel}"
								class="btn btn-ghost action-btn"
							>
								Practice {teil.name}
								<ArrowRight size={16} />
							</a>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</main>
</div>

<style>
	.app-shell {
		min-height: 100vh;
		background: var(--bg-primary);
		padding-bottom: var(--space-2xl);
	}

	.dashboard-content {
		max-width: 920px;
		margin: 0 auto;
		padding: var(--space-lg);
	}

	.top-nav {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: var(--space-md);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--text-secondary);
		font-weight: 500;
		font-size: 0.9rem;
	}

	.back-link:hover {
		color: var(--text-primary);
	}

	.level-text {
		font-size: 0.9rem;
		font-weight: 600;
		color: color-mix(in srgb, var(--writing-primary) 78%, #334155);
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: var(--space-xl);
		padding-bottom: var(--space-lg);
		border-bottom: 1px solid var(--border-subtle);
	}

	.header-welcome h1 {
		font-size: 2rem;
		margin: 0;
		color: var(--writing-primary);
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.35rem;
		flex-wrap: wrap;
	}

	.header-welcome p {
		margin: 0;
		color: var(--text-secondary);
	}

	.header-full-test-btn {
		background: color-mix(in srgb, var(--writing-primary) 10%, white);
		color: color-mix(in srgb, var(--writing-primary) 82%, #0f172a);
		border: 2px solid var(--writing-primary);
		white-space: nowrap;
		border-radius: var(--radius-full);
		min-height: 46px;
		padding: 0.65rem 1.1rem;
		font-weight: 600;
	}

	.header-full-test-btn:hover {
		background: color-mix(in srgb, var(--writing-primary) 16%, white);
		color: color-mix(in srgb, var(--writing-primary) 88%, #0f172a);
		border-color: color-mix(in srgb, var(--writing-primary) 88%, #0f172a);
	}

	.time-rule-card {
		margin-bottom: var(--space-lg);
		padding: var(--space-md);
		background: white;
		border: 1px solid var(--border-subtle);
		border-left: 3px solid var(--writing-primary);
		border-radius: var(--radius-md);
	}

	.rule-head {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--writing-primary);
		margin-bottom: 0.3rem;
	}

	.rule-head h2 {
		font-size: 1rem;
		margin: 0;
	}

	.time-total {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.time-rule {
		margin: 0.18rem 0 0;
		font-size: 0.88rem;
		color: var(--text-secondary);
	}

	.time-note {
		margin: 0.18rem 0 0;
		font-size: 0.88rem;
		color: var(--text-secondary);
	}

	.section-head {
		margin-bottom: var(--space-md);
	}

	.section-head h2 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-muted);
		font-weight: 600;
	}

	.modules-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.module-widget {
		background: white;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-height: 0;
	}

	.module-widget:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--border-default);
	}

	.widget-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.widget-header-main {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		min-width: 0;
	}

	.widget-icon {
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.widget-icon.writing {
		background: color-mix(in srgb, var(--writing-primary) 12%, white);
		color: color-mix(in srgb, var(--writing-primary) 72%, #334155);
	}

	.widget-title {
		flex: 1;
		min-width: 0;
	}

	.widget-title h3 {
		font-size: 1.05rem;
		margin: 0;
	}

	.widget-subtitle {
		display: inline-block;
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 0.1rem;
	}

	.teil-description {
		margin: 0.4rem 0 0;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--text-secondary);
	}

	.widget-footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: var(--space-md);
		border-top: 1px solid var(--border-subtle);
		gap: var(--space-sm);
	}

	.last-session {
		font-size: 0.75rem;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.action-btn {
		font-size: 0.8rem;
		padding: 0.35rem 0.75rem;
		gap: 0.25rem;
	}

	@media (max-width: 768px) {
		.dashboard-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}

	@media (max-width: 520px) {
		.widget-footer {
			flex-wrap: wrap;
		}

		.header-full-test-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
