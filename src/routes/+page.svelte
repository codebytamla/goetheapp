<script lang="ts">
	import { AlarmClock, ArrowRight, BookOpen, Clock3, Headphones, Mic, PenTool } from "@lucide/svelte";
	import AppNav from "$lib/components/AppNav.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	type ModuleId = "lesen" | "hoeren" | "schreiben" | "sprechen";

	const moduleIcons: Record<ModuleId, typeof BookOpen> = {
		lesen: BookOpen,
		hoeren: Headphones,
		schreiben: PenTool,
		sprechen: Mic
	};

	const modules: Array<{
		id: ModuleId;
		name: string;
		subtitle: string;
		progress: number;
		total: number;
		completed: number;
		lastSession: string;
		accent: "reading" | "listening" | "writing" | "speaking";
	}> = [
		{
			id: "lesen",
			name: "Lesen",
			subtitle: "Reading",
			progress: 35,
			total: 20,
			completed: 7,
			lastSession: "2h ago",
			accent: "reading"
		},
		{
			id: "hoeren",
			name: "Hören",
			subtitle: "Listening",
			progress: 60,
			total: 15,
			completed: 9,
			lastSession: "Yesterday",
			accent: "listening"
		},
		{
			id: "schreiben",
			name: "Schreiben",
			subtitle: "Writing",
			progress: 10,
			total: 10,
			completed: 1,
			lastSession: "3 days ago",
			accent: "writing"
		},
		{
			id: "sprechen",
			name: "Sprechen",
			subtitle: "Speaking",
			progress: 0,
			total: 12,
			completed: 0,
			lastSession: "Not started",
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
	<div class="app-shell">
		<AppNav user={data.user} />

		<main class="dashboard-content">
			<!-- Dashboard Header -->
			<header class="dashboard-header">
				<div class="header-welcome">
					<h1>Guten Tag, {data.user?.name ?? "Learner"}</h1>
					<p>Ready to continue your B1 preparation?</p>
				</div>
				<div class="header-stats">
					<div class="stat-card">
						<span class="stat-label">CEFR Level</span>
						<span class="stat-value">B1</span>
					</div>
					<div class="stat-card">
						<span class="stat-label">Exam Date</span>
						<span class="stat-value text-muted">Set Date</span>
					</div>
				</div>
			</header>

			<!-- Mock Exam Banner (Slim) -->
			<section class="mock-exam-banner">
				<div class="mock-exam-info">
					<div class="mock-icon">
						<AlarmClock size={24} />
					</div>
					<div class="mock-text">
						<h3>Full Mock Exam</h3>
						<p>Simulate the real test conditions (approx. 3.5h)</p>
					</div>
				</div>
				<a href="/mock-exam" class="btn btn-secondary btn-sm start-sim-btn">Start Simulation</a>
			</section>

			<!-- Modules Grid -->
			<div class="modules-grid">
				{#each modules as mod}
					{@const Icon = moduleIcons[mod.id]}
					<div class="module-widget">
						<div class="widget-header">
							<div class="widget-header-main">
								<div class="widget-icon {mod.accent}">
									<Icon size={24} />
								</div>
								<div class="widget-title">
									<h3>{mod.name}</h3>
									<span class="widget-subtitle">{mod.subtitle}</span>
								</div>
							</div>
						</div>

						<div class="widget-footer">
							<span class="last-session">
								<Clock3 size={14} />
								{mod.lastSession}
							</span>
							<a href="/{mod.id}" class="btn btn-ghost btn-sm action-btn">
								Practice
								<ArrowRight size={16} />
							</a>
						</div>
					</div>
				{/each}
			</div>

			<!-- Recent Activity / Quick Actions (Optional placeholder) -->
			<!-- <div class="recent-section">
				<h3>Recent Activity</h3>
				...
			</div> -->
		</main>
	</div>
{/if}

<style>
	/* === Landing Page (Unchanged) === */
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
		opacity: 0.28;
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

	/* === App Shell (Dashboard) === */
	.app-shell {
		min-height: 100vh;
		background: var(--bg-primary);
		padding-bottom: var(--space-2xl);
	}

	.dashboard-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
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
		margin-bottom: 0.25rem;
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

	.text-muted { color: var(--text-muted); }

	/* Mock Exam Banner */
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
		background: #f8fafc;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
	}

	.mock-text h3 {
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin-bottom: 0.15rem;
	}

	.mock-text p {
		font-size: 0.875rem;
		margin: 0;
	}

	.start-sim-btn {
		background: #1f2937;
		color: #ffffff;
		border-color: #1f2937;
	}

	.start-sim-btn:hover {
		background: #111827;
		border-color: #111827;
	}

	/* Modules Grid */
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

	.widget-icon.reading { background: color-mix(in srgb, var(--reading-glow) 88%, white); color: var(--reading-primary); }
	.widget-icon.listening { background: color-mix(in srgb, var(--listening-glow) 88%, white); color: var(--listening-primary); }
	.widget-icon.writing { background: color-mix(in srgb, var(--writing-glow) 88%, white); color: var(--writing-primary); }
	.widget-icon.speaking { background: color-mix(in srgb, var(--speaking-glow) 88%, white); color: var(--speaking-primary); }

	.widget-title {
		flex: 1;
		min-width: 0;
	}

	.widget-title h3 {
		font-size: 1.1rem;
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
	}

	@media (max-width: 520px) {
		.widget-footer {
			flex-wrap: wrap;
		}
	}
</style>
