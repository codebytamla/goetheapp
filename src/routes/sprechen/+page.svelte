<script lang="ts">
	import { ArrowLeft, ArrowRight, Clock3, ClipboardList } from "@lucide/svelte";
	import type { PageData } from "./$types";

	type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

	type SpeakingTeil = {
		id: string;
		name: string;
		title: string;
		duration: string;
		description: string;
		skills: string[];
	};

	type SpeakingConfig = {
		totalDuration: string;
		fullDescription: string;
		teile: SpeakingTeil[];
	};

	let { data }: { data: PageData } = $props();

	const levelConfigs: Record<CefrLevel, SpeakingConfig> = {
		A1: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full A1 oral format with 3 Teile: introduce yourself, answer simple questions, and complete a short partner task.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Sich vorstellen",
					duration: "3 min",
					description: "Give simple personal information about yourself.",
					skills: ["Basic personal info", "Simple sentence production"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Fragen stellen und antworten",
					duration: "5 min",
					description: "Ask and answer short everyday questions using prompts.",
					skills: ["Question forms", "Everyday vocabulary"]
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Gemeinsame Aufgabe",
					duration: "5 min",
					description: "Plan a simple shared activity with your partner.",
					skills: ["Simple negotiation", "Functional phrases"]
				}
			]
		},
		A2: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full A2 oral format with 3 Teile, focused on practical communication in common daily situations.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Sich vorstellen",
					duration: "3 min",
					description: "Introduce yourself with slightly more detail and structure.",
					skills: ["Personal narration", "Connected short statements"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Alltagsgespräche",
					duration: "5 min",
					description: "Exchange information and respond in everyday contexts.",
					skills: ["Clarifying questions", "Short interaction turns"]
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Etwas zusammen planen",
					duration: "5 min",
					description: "Coordinate a simple plan and agree on details.",
					skills: ["Making suggestions", "Agreeing and rejecting politely"]
				}
			]
		},
		B1: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full B1 oral format with 3 Teile: collaborative planning, short presentation, and follow-up discussion.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Gemeinsam etwas planen",
					duration: "3 min",
					description: "Work with your partner to make a concrete plan.",
					skills: ["Negotiation", "Suggestion building"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Ein Thema präsentieren",
					duration: "4 min",
					description: "Give a structured short presentation on a familiar topic.",
					skills: ["Presentation structure", "Explaining viewpoints"]
				},
				{
					id: "teil3",
					name: "Teil 3",
					title: "Über ein Thema sprechen",
					duration: "3 min",
					description: "Discuss the presented topic and react to your partner.",
					skills: ["Discussion flow", "Follow-up questions"]
				}
			]
		},
		B2: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full B2 oral format with 2 Teile: a longer presentation and a deeper argument-based discussion.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Präsentation",
					duration: "6 min",
					description: "Present a topic with clear argumentation and examples.",
					skills: ["Argument development", "Structured delivery"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Diskussion",
					duration: "7 min",
					description: "Discuss positions, react critically, and justify your stance.",
					skills: ["Counter-arguments", "Opinion defense"]
				}
			]
		},
		C1: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full C1 oral format with 2 Teile focused on high-level argumentation and nuanced discussion.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Präsentation",
					duration: "7 min",
					description: "Deliver an organized presentation with a precise position.",
					skills: ["Nuanced language", "Logical coherence"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Diskussion",
					duration: "7 min",
					description: "Analyze and debate viewpoints with control and flexibility.",
					skills: ["Spontaneous reactions", "Advanced interaction"]
				}
			]
		},
		C2: {
			totalDuration: "around 15 minutes",
			fullDescription:
				"Run the full C2 oral format with 2 Teile requiring precise, flexible, and sophisticated spoken German.",
			teile: [
				{
					id: "teil1",
					name: "Teil 1",
					title: "Präsentation",
					duration: "7 min",
					description: "Present a complex topic with depth, clarity, and style.",
					skills: ["Complex synthesis", "Rhetorical control"]
				},
				{
					id: "teil2",
					name: "Teil 2",
					title: "Diskussion",
					duration: "7 min",
					description: "Sustain an advanced discussion with precise argument handling.",
					skills: ["Fine distinctions", "High-level interaction"]
				}
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
	<meta
		name="description"
		content="Practice the speaking module with a level-specific exam format and full-test simulation."
	/>
</svelte:head>

<div class="page-container">
	<nav class="top-nav">
		<a href="/" class="back-link">
			<ArrowLeft size={16} />
			<span>Back to Dashboard</span>
		</a>
		<span class="level-pill">{data.selectedLevel} Format</span>
	</nav>

	<header class="page-header">
		<h1>Sprechen</h1>
		<p>This page adapts to your global CEFR level setting. Current structure: {levelConfig.teile.length} Teile.</p>
	</header>

	<section class="full-test-card">
		<div>
			<span class="card-label">Recommended</span>
			<h2>Full Speaking Test</h2>
			<p>{levelConfig.fullDescription}</p>
			<div class="quick-stats">
				<span><Clock3 size={14} /> {levelConfig.totalDuration}</span>
				<span><ClipboardList size={14} /> {levelConfig.teile.length} Teile</span>
			</div>
		</div>
		<a href="/sprechen/practice?mode=full&level={data.selectedLevel}" class="btn btn-primary full-test-cta">
			Start Full Test
			<ArrowRight size={16} />
		</a>
	</section>

	<section class="teile-section">
		<div class="section-head">
			<h2>Practice by Teil</h2>
			<p>Target one part when you want focused repetition.</p>
		</div>

		<div class="teile-grid">
			{#each levelConfig.teile as teil}
				<article class="teil-card">
					<div class="teil-meta">
						<span class="teil-badge">{teil.name}</span>
						<span class="teil-time"><Clock3 size={14} /> {teil.duration}</span>
					</div>
					<h3>{teil.title}</h3>
					<p>{teil.description}</p>
					<div class="skills">
						{#each teil.skills as skill}
							<span class="skill-chip">{skill}</span>
						{/each}
					</div>
					<a href="/sprechen/practice?mode=teil&teil={teil.id}&level={data.selectedLevel}" class="teil-cta">
						Start {teil.name}
						<ArrowRight size={15} />
					</a>
				</article>
			{/each}
		</div>
	</section>

	<p class="level-note">
		Need a different format? Change your global level on the <a href="/">dashboard selector</a>.
	</p>
</div>

<style>
	.page-container {
		max-width: 1040px;
		margin: 0 auto;
		padding: var(--space-lg);
		min-height: 100vh;
	}

	.top-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-xl);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--text-secondary);
		font-weight: 500;
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

	.page-header {
		margin-bottom: var(--space-lg);
	}

	.page-header h1 {
		margin: 0 0 0.35rem;
		font-size: clamp(1.8rem, 3.4vw, 2.4rem);
		color: var(--speaking-primary);
	}

	.page-header p {
		margin: 0;
		color: var(--text-secondary);
	}

	.full-test-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		padding: var(--space-xl);
		background: linear-gradient(115deg, #ffffff 0%, #f5fbff 100%);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		margin-bottom: var(--space-2xl);
	}

	.card-label {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #0f766e;
		background: #ccfbf1;
		border-radius: var(--radius-full);
		padding: 0.24rem 0.6rem;
		margin-bottom: var(--space-sm);
	}

	.full-test-card h2 {
		margin: 0;
		font-size: 1.55rem;
	}

	.full-test-card p {
		margin: var(--space-sm) 0 0;
		color: var(--text-secondary);
		max-width: 60ch;
		line-height: 1.55;
	}

	.quick-stats {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
		margin-top: var(--space-md);
	}

	.quick-stats span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.full-test-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		white-space: nowrap;
	}

	.section-head {
		margin-bottom: var(--space-lg);
	}

	.section-head h2 {
		margin-bottom: 0.3rem;
	}

	.section-head p {
		margin: 0;
		color: var(--text-secondary);
	}

	.teile-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
		gap: var(--space-md);
	}

	.teil-card {
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
	}

	.teil-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		margin-bottom: var(--space-sm);
	}

	.teil-badge {
		font-size: 0.73rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--speaking-primary);
	}

	.teil-time {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.teil-card h3 {
		margin: 0;
		font-size: 1.08rem;
	}

	.teil-card p {
		margin: var(--space-sm) 0 var(--space-md);
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-bottom: var(--space-md);
	}

	.skill-chip {
		font-size: 0.75rem;
		padding: 0.24rem 0.55rem;
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		color: var(--text-secondary);
	}

	.teil-cta {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 600;
		color: var(--speaking-primary);
	}

	.level-note {
		margin-top: var(--space-xl);
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	.level-note a {
		color: var(--speaking-primary);
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.full-test-card {
			flex-direction: column;
			align-items: flex-start;
			padding: var(--space-lg);
		}

		.full-test-cta {
			width: 100%;
			justify-content: center;
		}
	}
</style>
