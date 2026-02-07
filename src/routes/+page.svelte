<script lang="ts">
	import { BookOpen, Clock3, Headphones, Languages, ListChecks, Mic, PenTool, Target } from "@lucide/svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const moduleIcons = {
		lesen: BookOpen,
		hoeren: Headphones,
		schreiben: PenTool,
		sprechen: Mic
	};

	const modules = [
		{
			id: "lesen",
			name: "Lesen",
			subtitle: "Reading",
			description: "Master text comprehension with authentic Goethe-style passages",
			tasks: "5 Teile",
			duration: "65 min",
			skills: ["Headline matching", "Detail extraction", "Multiple choice"],
			accent: "reading"
		},
		{
			id: "hoeren",
			name: "Hören",
			subtitle: "Listening",
			description: "Train your ear with announcements, dialogues, and interviews",
			tasks: "4 Teile",
			duration: "40 min",
			skills: ["Keyword capture", "Note-taking", "Speaker identification"],
			accent: "listening"
		},
		{
			id: "schreiben",
			name: "Schreiben",
			subtitle: "Writing",
			description: "Perfect your formal emails and argumentative essays",
			tasks: "2 Teile",
			duration: "75 min",
			skills: ["Formal register", "Connectors", "Paragraph structure"],
			accent: "writing"
		},
		{
			id: "sprechen",
			name: "Sprechen",
			subtitle: "Speaking",
			description: "Simulate the oral exam with AI-powered feedback",
			tasks: "3 Teile",
			duration: "15 min",
			skills: ["Fluency", "Pronunciation", "Argument structure"],
			accent: "speaking"
		}
	];

</script>

{#if !data.isAuthenticated}
	<div class="landing">
		<div class="landing-bg">
			<div class="orb orb-1"></div>
			<div class="orb orb-2"></div>
			<div class="orb orb-3"></div>
			<div class="orb orb-4"></div>
		</div>
		<div class="landing-content">
			<p class="landing-eyebrow">Goethe Prüfung Trainer</p>
			<h1 class="landing-title">
				Master Your<br />
				<span class="gradient-text">German Exam</span>
			</h1>
			<p class="landing-subtitle">
				Interactive practice for all four exam modules with AI-powered feedback and real exam simulations.
			</p>
			<div class="landing-actions">
				<a class="btn btn-primary btn-lg" href="/auth">Get Started</a>
				<button class="btn btn-secondary btn-lg" type="button">Learn More</button>
			</div>
			<div class="landing-modules">
				{#each modules as mod, i}
					{@const Icon = moduleIcons[mod.id]}
					<div class="landing-module-pill {mod.accent}" style="animation-delay: {i * 100}ms">
						<Icon size={16} aria-hidden="true" />
						<span>{mod.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="app-container">
		<!-- Navigation -->
		<nav class="nav">
			<div class="nav-brand">
				<span class="nav-logo"><Languages size={20} aria-hidden="true" /></span>
				<span class="nav-title">Goethe Trainer</span>
			</div>
			<div class="nav-links">
				<a href="/" class="nav-link active">Dashboard</a>
				<a href="/progress" class="nav-link">Progress</a>
				<a href="/mock-exam" class="nav-link">Mock Exam</a>
			</div>
			<div class="nav-user">
				<span class="nav-user-name">{data.user?.name ?? data.user?.email?.split('@')[0] ?? "Learner"}</span>
				<a href="/auth" class="btn btn-ghost">Account</a>
			</div>
		</nav>

		<!-- Mock Exam CTA -->
		<section class="mock-exam-section">
			<div class="mock-exam-card">
				<div class="mock-exam-content">
					<span class="mock-exam-badge">Full Simulation</span>
					<h2>Ready for a Mock Exam?</h2>
					<p>Take a complete Goethe B1 simulation with all four modules under real exam conditions.</p>
					<div class="mock-exam-info">
						<span><Clock3 size={14} aria-hidden="true" /> ~3.5 hours</span>
						<span><ListChecks size={14} aria-hidden="true" /> All 4 modules</span>
						<span><Target size={14} aria-hidden="true" /> CEFR assessment</span>
					</div>
				</div>
				<a href="/mock-exam" class="btn btn-primary btn-lg">Start Mock Exam</a>
			</div>
		</section>

		<!-- Modules Section -->
		<section class="modules-section">
			<div class="section-header">
			<!-- <span class="mock-exam-badge">Modules</span> -->
				<!-- <h2>Modules</h2> -->
				<!-- <p>Choose a module to practice or take a full mock exam</p> -->
			</div>

			<div class="modules-grid">
				{#each modules as mod, i}
					{@const Icon = moduleIcons[mod.id]}
					<a
						href="/{mod.id}"
						class="module-card {mod.accent}"
						style="animation-delay: {i * 80}ms"
					>
						<div class="module-header">
							<span class="module-icon">
								<Icon size={30} aria-hidden="true" />
							</span>
						</div>

						<div class="module-body">
							<h3 class="module-name">{mod.name}</h3>
							<p class="module-subtitle">{mod.subtitle}</p>
							<p class="module-description">{mod.description}</p>
						</div>

						<div class="module-meta">
							<span class="meta-item">
								<ListChecks size={14} aria-hidden="true" />
								{mod.tasks}
							</span>
							<span class="meta-item">
								<Clock3 size={14} aria-hidden="true" />
								{mod.duration}
							</span>
						</div>

						<!--
						<div class="module-skills">
							{#each mod.skills as skill}
								<span class="skill-tag">{skill}</span>
							{/each}
						</div>
						-->

						<div class="module-cta">
							<span>Start Practice</span>
							<span class="cta-arrow">→</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

	</div>
{/if}

<style>
	/* === Landing Page === */
	.landing {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: var(--space-xl);
	}

	.landing-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		animation: float 8s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: var(--reading-primary);
		top: -100px;
		left: -100px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 350px;
		height: 350px;
		background: var(--listening-primary);
		top: 20%;
		right: -80px;
		animation-delay: 2s;
	}

	.orb-3 {
		width: 300px;
		height: 300px;
		background: var(--writing-primary);
		bottom: 10%;
		left: 20%;
		animation-delay: 4s;
	}

	.orb-4 {
		width: 250px;
		height: 250px;
		background: var(--speaking-primary);
		bottom: -50px;
		right: 20%;
		animation-delay: 6s;
	}

	.landing-content {
		text-align: center;
		position: relative;
		z-index: 1;
		max-width: 700px;
	}

	.landing-eyebrow {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin-bottom: var(--space-md);
		animation: slideDown 0.6s ease forwards;
	}

	.landing-title {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: var(--space-lg);
		animation: slideUp 0.6s ease forwards;
		animation-delay: 0.1s;
		opacity: 0;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--reading-primary), var(--listening-primary), var(--writing-primary), var(--speaking-primary));
		background-size: 300% 300%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 6s ease infinite;
	}

	.landing-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 500px;
		margin: 0 auto var(--space-xl);
		animation: slideUp 0.6s ease forwards;
		animation-delay: 0.2s;
		opacity: 0;
	}

	.landing-actions {
		display: flex;
		gap: var(--space-md);
		justify-content: center;
		flex-wrap: wrap;
		animation: slideUp 0.6s ease forwards;
		animation-delay: 0.3s;
		opacity: 0;
	}

	.landing-modules {
		display: flex;
		gap: var(--space-sm);
		justify-content: center;
		flex-wrap: wrap;
		margin-top: var(--space-3xl);
	}

	.landing-module-pill {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		animation: slideUp 0.6s ease forwards;
		opacity: 0;
	}

	.landing-module-pill.reading { border-color: var(--reading-glow); }
	.landing-module-pill.listening { border-color: var(--listening-glow); }
	.landing-module-pill.writing { border-color: var(--writing-glow); }
	.landing-module-pill.speaking { border-color: var(--speaking-glow); }

	/* === App Container === */
	.app-container {
		min-height: 100vh;
		padding: var(--space-lg);
		max-width: 1400px;
		margin: 0 auto;
	}

	/* === Navigation === */
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
		animation: slideDown 0.5s ease forwards;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.nav-logo {
		font-size: 1.5rem;
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

	/* === Modules Section === */
	.modules-section {
		animation: slideUp 0.6s ease forwards;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-xl);
	}

	.section-header h2 {
		margin: 0;
	}

	.section-header p {
		margin: var(--space-xs) 0 0;
	}

	.modules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
	}

	.module-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-xl);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		transition: all var(--transition-normal);
		animation: slideUp 0.5s ease forwards;
		opacity: 0;
		cursor: pointer;
		text-decoration: none;
	}

	.module-card:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-default);
		transform: translateY(-8px);
	}

	.module-card.reading:hover { box-shadow: var(--shadow-glow) var(--reading-glow); }
	.module-card.listening:hover { box-shadow: var(--shadow-glow) var(--listening-glow); }
	.module-card.writing:hover { box-shadow: var(--shadow-glow) var(--writing-glow); }
	.module-card.speaking:hover { box-shadow: var(--shadow-glow) var(--speaking-glow); }

	.module-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-lg);
	}

	.module-icon {
		font-size: 2.5rem;
	}

	.module-body {
		flex: 1;
	}

	.module-name {
		font-size: 1.5rem;
		margin-bottom: 0;
	}

	.reading .module-name { color: var(--reading-primary); }
	.listening .module-name { color: var(--listening-primary); }
	.writing .module-name { color: var(--writing-primary); }
	.speaking .module-name { color: var(--speaking-primary); }

	.module-subtitle {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin: var(--space-xs) 0 var(--space-md);
	}

	.module-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.module-meta {
		display: flex;
		gap: var(--space-lg);
		margin-top: var(--space-lg);
		padding-top: var(--space-md);
		border-top: 1px solid var(--border-subtle);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.module-skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-md);
	}

	.skill-tag {
		font-size: 0.75rem;
		padding: var(--space-xs) var(--space-sm);
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		color: var(--text-muted);
	}

	.module-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--space-lg);
		padding: var(--space-md);
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		font-weight: 600;
		color: var(--text-primary);
		transition: all var(--transition-fast);
	}

	.module-card:hover .module-cta {
		background: var(--bg-primary);
	}

	.cta-arrow {
		transition: transform var(--transition-fast);
	}

	.module-card:hover .cta-arrow {
		transform: translateX(4px);
	}

	/* === Mock Exam Section === */
	.mock-exam-section {
		margin-top: var(--space-2xl);
		animation: slideUp 0.6s ease forwards;
		animation-delay: 0.2s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.mock-exam-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-xl);
		padding: var(--space-lg) var(--space-2xl);
		background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-xl);
		position: relative;
		overflow: hidden;
	}

	.mock-exam-card::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 40%;
		height: 100%;
		background: radial-gradient(ellipse at right, var(--writing-glow) 0%, transparent 70%);
		opacity: 0.3;
	}

	.mock-exam-content {
		position: relative;
		z-index: 1;
	}

	.mock-exam-badge {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: var(--space-xs) var(--space-sm);
		background: var(--writing-primary);
		color: white;
		border-radius: var(--radius-sm);
		margin-bottom: var(--space-md);
	}

	.mock-exam-content h2 {
		margin-bottom: var(--space-sm);
	}

	.mock-exam-content p {
		max-width: 400px;
	}

	.mock-exam-info {
		display: flex;
		gap: var(--space-lg);
		margin-top: var(--space-md);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.mock-exam-info span {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
	}

	/* === Responsive === */
	@media (max-width: 768px) {
		.nav {
			flex-direction: column;
			gap: var(--space-md);
		}

		.nav-links {
			order: 3;
			width: 100%;
			justify-content: center;
		}

		.mock-exam-card {
			flex-direction: column;
			text-align: center;
		}

		.mock-exam-info {
			justify-content: center;
			flex-wrap: wrap;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
		}
	}
</style>
