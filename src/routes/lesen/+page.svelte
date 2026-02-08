<script lang="ts">
	import { ArrowLeft, ArrowRight, BookOpen, ClipboardList } from "@lucide/svelte";
	import type { PageData } from "./$types";

	type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

	type ReadingTeil = {
		id: string;
		name: string;
		title: string;
		format: string;
		description: string;
	};

	type ReadingConfig = {
		teile: ReadingTeil[];
	};

	let { data }: { data: PageData } = $props();

	const levelConfigs: Record<CefrLevel, ReadingConfig> = {
		A1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short notices / signs",
					format: "Match text to situation",
					description: "Match short notices or signs to the correct everyday situation."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Short messages / ads",
					format: "True / false",
					description: "Read short messages or ads and decide whether statements are true or false."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Simple email or note",
					format: "Choose correct answers",
					description: "Read a simple email or note and select the correct answers."
				}
			]
		},
		A2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short everyday texts",
					format: "Matching",
					description: "Match short everyday texts such as ads and notices to the right prompts."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Emails / short articles",
					format: "Multiple choice",
					description: "Read emails or short articles and answer multiple-choice questions."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Longer practical text",
					format: "True / false",
					description: "Work through a longer practical text and mark statements true or false."
				}
			]
		},
		B1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short texts",
					format: "Matching",
					description: "Read announcements or emails and match information to the right prompt."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Informational texts",
					format: "Multiple choice",
					description: "Answer multiple-choice questions based on informational texts."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Opinions / blogs",
					format: "True / false",
					description: "Evaluate opinion texts or blogs and decide whether statements are true or false."
				},
				{
					id: "teil4",
					name: "Teil 4",
					title: "One longer text",
					format: "Detailed comprehension",
					description: "Read one longer text carefully and answer detail-focused questions."
				}
			]
		},
		B2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short texts",
					format: "Match headings",
					description: "Match headings to short texts by identifying the central idea."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Articles / reports",
					format: "Multiple choice",
					description: "Read articles or reports and answer targeted multiple-choice items."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "One complex text",
					format: "Detailed questions",
					description: "Process one complex text and answer detailed comprehension questions."
				},
				{
					id: "teil4",
					name: "Teil 4",
					title: "Gapped text",
					format: "Choose correct sentences",
					description: "Fill a gapped text by selecting the most suitable missing sentences."
				}
			]
		},
		C1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short texts",
					format: "Match statements",
					description: "Match nuanced statements to short texts with careful attention to meaning."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Long factual text",
					format: "Multiple choice",
					description: "Answer multiple-choice questions on a long factual text."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Opinion / argumentative text",
					format: "Deep comprehension",
					description: "Analyze argumentative writing and respond to deeper comprehension tasks."
				},
				{
					id: "teil4",
					name: "Teil 4",
					title: "Gapped text",
					format: "Sentence insertion",
					description: "Insert missing sentences into a gapped text while preserving coherence."
				}
			]
		},
		C2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short complex texts",
					format: "Match meaning",
					description: "Match subtle meaning in short complex texts with high precision."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Long abstract text",
					format: "Detailed analysis",
					description: "Perform detailed analysis on a long abstract text."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Highly complex text",
					format: "Inference and nuance",
					description: "Interpret inference, tone, and nuance in highly complex writing."
				},
				{
					id: "teil4",
					name: "Teil 4",
					title: "Gapped text",
					format: "Advanced sentence matching",
					description: "Complete a gapped text using advanced sentence matching."
				}
			]
		}
	};

	const getLevelConfig = (level: string): ReadingConfig => {
		const typedLevel = level as CefrLevel;
		return levelConfigs[typedLevel] ?? levelConfigs.B1;
	};

	let levelConfig = $derived(getLevelConfig(data.selectedLevel));
</script>

<svelte:head>
	<title>Lesen | Goethe Prüfung Practice</title>
	<meta name="description" content="Practice the reading module for your Goethe exam." />
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
					<h1>Lesen</h1>
					<span class="level-text">{data.selectedLevel}</span>
				</div>
				<p>Each level has a different reading format. Practice by Teil, then run the full test.</p>
			</div>
			<a
				href="/lesen/practice?mode=full&level={data.selectedLevel}"
				class="btn btn-secondary header-full-test-btn"
			>
				<span class="cta-play-icon" aria-hidden="true"></span>
				Full Reading Test
			</a>
		</header>

		<section class="teile-section">
			<div class="section-head">
				<h2>Practice by Teil</h2>
			</div>

			<div class="modules-grid">
				{#each levelConfig.teile as teil}
					<article class="module-widget">
						<div class="widget-header">
							<div class="widget-header-main">
								<div class="widget-icon reading">
									<BookOpen size={20} />
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
								<ClipboardList size={14} />
								{teil.format}
							</span>
							<a
								href="/lesen/practice?mode=teil&teil={teil.id}&level={data.selectedLevel}"
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
		color: color-mix(in srgb, var(--reading-primary) 78%, #334155);
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
		color: var(--reading-primary);
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
		background: color-mix(in srgb, var(--reading-primary) 10%, white);
		color: color-mix(in srgb, var(--reading-primary) 82%, #0f172a);
		border: 2px solid var(--reading-primary);
		white-space: nowrap;
		border-radius: var(--radius-full);
		min-height: 46px;
		padding: 0.65rem 1.1rem;
		font-weight: 600;
	}

	.header-full-test-btn:hover {
		background: color-mix(in srgb, var(--reading-primary) 16%, white);
		color: color-mix(in srgb, var(--reading-primary) 88%, #0f172a);
		border-color: color-mix(in srgb, var(--reading-primary) 88%, #0f172a);
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

	.widget-icon.reading {
		background: color-mix(in srgb, var(--reading-primary) 12%, white);
		color: color-mix(in srgb, var(--reading-primary) 72%, #334155);
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
