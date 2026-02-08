<script lang="ts">
	import {
		AlarmClock,
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
				{ id: "teil1", name: "Teil 1", title: "Sich vorstellen", duration: "3 min" },
				{ id: "teil2", name: "Teil 2", title: "Fragen & Antworten", duration: "5 min" },
				{ id: "teil3", name: "Teil 3", title: "Gemeinsame Aufgabe", duration: "5 min" }
			]
		},
		A2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Sich vorstellen", duration: "3 min" },
				{ id: "teil2", name: "Teil 2", title: "Alltagsgespräche", duration: "5 min" },
				{ id: "teil3", name: "Teil 3", title: "Etwas planen", duration: "5 min" }
			]
		},
		B1: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Gemeinsam planen", duration: "3 min" },
				{ id: "teil2", name: "Teil 2", title: "Präsentation", duration: "4 min" },
				{ id: "teil3", name: "Teil 3", title: "Diskussion", duration: "3 min" }
			]
		},
		B2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "6 min" },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min" }
			]
		},
		C1: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "7 min" },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min" }
			]
		},
		C2: {
			totalDuration: "~15 min",
			teile: [
				{ id: "teil1", name: "Teil 1", title: "Präsentation", duration: "7 min" },
				{ id: "teil2", name: "Teil 2", title: "Diskussion", duration: "7 min" }
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
				<span>Dashboard</span>
			</a>
			<span class="level-pill">{data.selectedLevel}</span>
		</nav>

		<header class="dashboard-header">
			<div class="header-welcome">
				<h1>Sprechen</h1>
				<p>Speaking practice</p>
			</div>
			<div class="header-stats">
				<div class="stat-card">
					<span class="stat-label">Format</span>
					<span class="stat-value">{levelConfig.teile.length} Teile</span>
				</div>
			</div>
		</header>

		<section class="mock-exam-banner">
			<div class="mock-exam-info">
				<div class="mock-icon"><AlarmClock size={22} /></div>
				<div class="mock-text">
					<h3>Full Test</h3>
					<p>{levelConfig.totalDuration}</p>
				</div>
			</div>
			<a href="/sprechen/practice?mode=full&level={data.selectedLevel}" class="btn btn-secondary start-btn">
				Start
			</a>
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
								<div class="widget-icon speaking">
									<Mic size={20} />
								</div>
								<div class="widget-title">
									<h3>{teil.title}</h3>
									<span class="widget-subtitle">{teil.name}</span>
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
								Start
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
		max-width: 1200px;
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

	.header-stats {
		display: flex;
		gap: var(--space-lg);
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		font-weight: 600;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.mock-exam-banner {
		background: white;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-md) var(--space-lg);
		min-height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-xl);
		box-shadow: var(--shadow-sm);
	}

	.mock-exam-info {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.mock-icon {
		width: 44px;
		height: 44px;
		background: color-mix(in srgb, var(--speaking-glow) 88%, white);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--speaking-primary);
	}

	.mock-text h3 {
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.15rem;
	}

	.mock-text p {
		font-size: 0.875rem;
		margin: 0;
	}

	.start-btn {
		background: #1f2937;
		color: #ffffff;
		border-color: #1f2937;
	}

	.start-btn:hover {
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
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-lg);
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
		min-height: 160px;
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
		font-size: 0.8rem;
		color: var(--text-muted);
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

		.header-stats {
			width: 100%;
			justify-content: flex-start;
		}

		.mock-exam-banner {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
		}
	}

	@media (max-width: 520px) {
		.widget-footer {
			flex-wrap: wrap;
		}

		.start-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
