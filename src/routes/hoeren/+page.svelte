<script lang="ts">
	import { ArrowLeft, ArrowRight, Headphones, Timer } from "@lucide/svelte";
	import type { PageData } from "./$types";

	type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

	type ListeningTeil = {
		id: string;
		name: string;
		title: string;
		listenRule: string;
		description: string;
	};

	type ListeningConfig = {
		teile: ListeningTeil[];
	};

	let { data }: { data: PageData } = $props();

	const levelConfigs: Record<CefrLevel, ListeningConfig> = {
		A1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short announcements / dialogues",
					listenRule: "One listen",
					description: "Identify key details from short announcements and mini-dialogues."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Simple conversations",
					listenRule: "Two listens",
					description: "Follow simple conversations and answer with better accuracy across two plays."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Short messages",
					listenRule: "One listen",
					description: "Understand short spoken messages in one pass."
				}
			]
		},
		A2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Everyday conversations",
					listenRule: "One listen",
					description: "Track practical everyday exchanges and choose the best response."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Announcements / info",
					listenRule: "Two listens",
					description: "Extract concrete details from announcements and informational audio."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Longer dialogue",
					listenRule: "One or two listens",
					description: "Follow a longer dialogue and handle connected meaning across turns."
				}
			]
		},
		B1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short conversations",
					listenRule: "One listen",
					description: "Understand short exchanges and capture core intent quickly."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Interviews / reports",
					listenRule: "Two listens",
					description: "Work through interview or report content with two listens for precision."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Longer talk",
					listenRule: "One listen",
					description: "Process one longer talk and answer while information flows."
				}
			]
		},
		B2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Short texts",
					listenRule: "One listen",
					description: "Handle compact listening texts with fast comprehension."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Interviews / discussions",
					listenRule: "Two listens",
					description: "Analyze viewpoints in interviews and discussions with two listens."
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Lecture or report",
					listenRule: "One listen",
					description: "Follow a structured lecture or report in one full run."
				}
			]
		},
		C1: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Interviews / discussions",
					listenRule: "Two listens",
					description: "Evaluate nuanced positions and speaker intent in advanced discussions."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Long lecture / report",
					listenRule: "One listen",
					description: "Maintain concentration through longer expert-level input."
				}
			]
		},
		C2: {
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Complex discussions",
					listenRule: "Two listens",
					description: "Track subtle argumentation and stance in complex multi-speaker audio."
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Long abstract lecture",
					listenRule: "One listen",
					description: "Interpret abstract high-density content in a single run."
				}
			]
		}
	};

	const getLevelConfig = (level: string): ListeningConfig => {
		const typedLevel = level as CefrLevel;
		return levelConfigs[typedLevel] ?? levelConfigs.B1;
	};

	let levelConfig = $derived(getLevelConfig(data.selectedLevel));
</script>

<svelte:head>
	<title>Hören | Goethe Prüfung Practice</title>
	<meta name="description" content="Practice the listening module for your Goethe exam." />
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
					<h1>Hören</h1>
					<span class="level-text">{data.selectedLevel}</span>
				</div>
				<p>Practice with fixed-time audio flow for each Teil, then take the full listening simulation.</p>
			</div>
			<a
				href="/hoeren/practice?mode=full&level={data.selectedLevel}"
				class="btn btn-secondary header-full-test-btn"
			>
				<span class="cta-play-icon" aria-hidden="true"></span>
				Full Listening Test
			</a>
		</header>

		<section class="time-rule-card" aria-label="Listening time rule">
			<div class="rule-head">
				<Timer size={16} />
				<h2>Listening Time Rule</h2>
			</div>
			<ul>
				<li>Each Teil has fixed time.</li>
				<li>No pause, rewind, or extension.</li>
				<li>Audio controls when start and stop happen.</li>
				<li>Answer while listening or in short pauses.</li>
			</ul>
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
								<div class="widget-icon listening">
									<Headphones size={20} />
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
								<Headphones size={14} />
								{teil.listenRule}
							</span>
							<a
								href="/hoeren/practice?mode=teil&teil={teil.id}&level={data.selectedLevel}"
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
		color: color-mix(in srgb, var(--listening-primary) 78%, #334155);
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
		color: var(--listening-primary);
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
		background: color-mix(in srgb, var(--listening-primary) 10%, white);
		color: color-mix(in srgb, var(--listening-primary) 82%, #0f172a);
		border: 2px solid var(--listening-primary);
		white-space: nowrap;
		border-radius: var(--radius-full);
		min-height: 46px;
		padding: 0.65rem 1.1rem;
		font-weight: 600;
	}

	.header-full-test-btn:hover {
		background: color-mix(in srgb, var(--listening-primary) 16%, white);
		color: color-mix(in srgb, var(--listening-primary) 88%, #0f172a);
		border-color: color-mix(in srgb, var(--listening-primary) 88%, #0f172a);
	}

	.time-rule-card {
		margin-bottom: var(--space-lg);
		padding: var(--space-md);
		background: white;
		border: 1px solid var(--border-subtle);
		border-left: 3px solid var(--listening-primary);
		border-radius: var(--radius-md);
	}

	.rule-head {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--listening-primary);
		margin-bottom: 0.35rem;
	}

	.rule-head h2 {
		font-size: 1rem;
		margin: 0;
	}

	.time-rule-card ul {
		margin: 0;
		padding-left: 1.2rem;
		color: var(--text-secondary);
		font-size: 0.9rem;
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

	.widget-icon.listening {
		background: color-mix(in srgb, var(--listening-primary) 12%, white);
		color: color-mix(in srgb, var(--listening-primary) 72%, #334155);
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
