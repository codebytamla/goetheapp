<script lang="ts">
	import {
		ArrowLeft,
		ArrowRight,
		Clock3,
		Mic,
	} from "@lucide/svelte";
	import type { PageData } from "./$types";

	type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

	type SpeakingTeil = {
		id: string;
		name: string;
		title: string;
		duration: string;
		description: string;
	};

	type SpeakingConfig = {
		totalDuration: string;
		teile: SpeakingTeil[];
	};

	let { data }: { data: PageData } = $props();

	const levelConfigs: Record<CefrLevel, SpeakingConfig> = {
		A1: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Sich vorstellen", duration: "3 min", description: "Introduce yourself with clear, simple personal information." },
				{ id: "teil2", name: "Teil 2", title: "Fragen & Antworten", duration: "5 min", description: "Ask and answer short everyday questions naturally." },
				{ id: "teil3", name: "Teil 3", title: "Gemeinsame Aufgabe", duration: "5 min", description: "Work with your partner to agree on a simple plan." }
			]
		},
		A2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Sich vorstellen", duration: "3 min", description: "Present yourself with connected, basic sentences." },
				{ id: "teil2", name: "Teil 2", title: "Alltagsgespräche", duration: "5 min", description: "Handle common daily situations with direct responses." },
				{ id: "teil3", name: "Teil 3", title: "Etwas planen", duration: "5 min", description: "Make a plan together and justify practical choices." }
			]
		},
		B1: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Gemeinsam planen", duration: "3 min", description: "Negotiate options and reach a clear shared decision." },
				{ id: "teil2", name: "Teil 2", title: "Präsentation", duration: "4 min", description: "Give a short structured presentation on one topic." },
				{ id: "teil3", name: "Teil 3", title: "Diskussion", duration: "3 min", description: "Discuss follow-up questions and defend your opinion." }
			]
		},
		B2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "6 min", description: "Present arguments with examples and clear structure." },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min", description: "Debate viewpoints, react quickly, and conclude clearly." }
			]
		},
		C1: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "7 min", description: "Deliver a nuanced presentation with strong coherence." },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min", description: "Handle complex discussion with precise language control." }
			]
		},
		C2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "7 min", description: "Present sophisticated ideas with flexible expression." },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min", description: "Sustain advanced debate with subtle argument handling." }
			]
		}
	};

	const getLevelConfig = (level: string): SpeakingConfig => {
		const typedLevel = level as CefrLevel;
		return levelConfigs[typedLevel] ?? levelConfigs.B1;
	};

	let levelConfig = $derived(getLevelConfig(data.selectedLevel));
</script>

<svelte:head>
	<title>Sprechen | Goethe Prüfung Practice</title>
	<meta name="description" content="Practice the speaking module for your Goethe exam." />
</svelte:head>

<div class="app-shell">
	<main class="dashboard-content">
		<nav class="top-nav">
			<a href="/" class="back-link">
				<ArrowLeft size={16} />
			</a>
			<span class="level-pill">{data.selectedLevel}</span>
		</nav>

		<header class="dashboard-header">
			<div class="header-welcome">
				<h1>Sprechen</h1>
				<p>Speaking practice</p>
			</div>
			<a
				href="/sprechen/practice?mode=full&level={data.selectedLevel}"
				class="btn btn-secondary header-full-test-btn"
			>
				Start Full Test
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
								<div class="widget-icon speaking">
									<Mic size={20} />
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
								<Clock3 size={14} />
								{teil.duration}
							</span>
							<a
								href="/sprechen/practice?mode=teil&teil={teil.id}&level={data.selectedLevel}"
								class="btn btn-ghost action-btn"
							>
								Start {teil.name}
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
		justify-content: space-between;
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

	.level-pill {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--speaking-primary);
		background: var(--speaking-glow);
		border: 1px solid color-mix(in oklab, var(--speaking-primary) 35%, white);
		border-radius: var(--radius-full);
		padding: 0.35rem 0.65rem;
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
		margin: 0 0 0.25rem;
		color: var(--speaking-primary);
	}

	.header-welcome p {
		margin: 0;
		color: var(--text-secondary);
	}

	.header-full-test-btn {
		background: #1f2937;
		color: #ffffff;
		border-color: #1f2937;
		white-space: nowrap;
	}

	.header-full-test-btn:hover {
		background: #111827;
		border-color: #111827;
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

	.widget-icon.speaking {
		background: color-mix(in srgb, var(--speaking-glow) 88%, white);
		color: var(--speaking-primary);
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
