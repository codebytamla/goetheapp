<script lang="ts">
	import { Separator, Tabs, Progress } from "bits-ui";

	const teile = [
		{
			id: "teil1",
			name: "Teil 1",
			title: "Korrespondenz",
			description: "Read two short texts and answer multiple choice questions about their content.",
			duration: "10 min",
			tasks: "6 items",
			skills: ["Understanding main ideas", "Finding specific information"]
		},
		{
			id: "teil2",
			name: "Teil 2",
			title: "Presse",
			description: "Read a longer article and match headlines or statements to paragraphs.",
			duration: "20 min",
			tasks: "6 items",
			skills: ["Understanding structure", "Topic identification"]
		},
		{
			id: "teil3",
			name: "Teil 3",
			title: "Alltagssituationen",
			description: "Read short situational texts and answer true/false questions.",
			duration: "10 min",
			tasks: "7 items",
			skills: ["Detail extraction", "Understanding context"]
		},
		{
			id: "teil4",
			name: "Teil 4",
			title: "Meinungen",
			description: "Read opinion texts from different people and match statements to speakers.",
			duration: "15 min",
			tasks: "6 items",
			skills: ["Distinguishing opinions", "Comparing viewpoints"]
		},
		{
			id: "teil5",
			name: "Teil 5",
			title: "Formelle Korrespondenz",
			description: "Read a formal text with gaps and choose the correct words to fill them.",
			duration: "10 min",
			tasks: "5 items",
			skills: ["Grammar in context", "Formal register"]
		}
	];

	let selectedTeil = $state("teil1");
</script>

<svelte:head>
	<title>Lesen | Goethe Prüfung Practice</title>
</svelte:head>

<div class="page-container">
	<nav class="back-nav">
		<a href="/" class="back-link">
			<span class="back-icon">←</span>
			<span>Back to Dashboard</span>
		</a>
	</nav>

	<header class="module-header reading">
		<div class="header-content">
			<div class="header-icon">📖</div>
			<div class="header-text">
				<h1>Lesen</h1>
				<p class="header-subtitle">Reading Module</p>
			</div>
		</div>
		<div class="header-meta">
			<span class="meta-badge"><span>⏱️</span> 65 min</span>
			<span class="meta-badge"><span>📋</span> 5 Teile</span>
			<span class="meta-badge progress">71% mastery</span>
		</div>
	</header>

	<Separator.Root decorative class="section-divider" />

	<section class="teile-section">
		<h2>Select a Teil to Practice</h2>
		<p>Each Teil tests different reading skills</p>

		<Tabs.Root bind:value={selectedTeil} class="teile-tabs">
			<Tabs.List class="teile-list">
				{#each teile as teil}
					<Tabs.Trigger value={teil.id} class="teil-trigger">
						<span class="teil-num">{teil.name}</span>
					</Tabs.Trigger>
				{/each}
			</Tabs.List>

			{#each teile as teil}
				<Tabs.Content value={teil.id} class="teil-content">
					<div class="teil-card">
						<div class="teil-header">
							<div>
								<span class="teil-badge">{teil.name}</span>
								<h3>{teil.title}</h3>
							</div>
							<div class="teil-meta">
								<span>⏱️ {teil.duration}</span>
								<span>📋 {teil.tasks}</span>
							</div>
						</div>
						<p class="teil-description">{teil.description}</p>
						<div class="teil-skills">
							{#each teil.skills as skill}
								<span class="skill-chip">{skill}</span>
							{/each}
						</div>
						<a href="/lesen/practice?teil={teil.id}" class="teil-cta">
							Start {teil.name}
							<span>→</span>
						</a>
					</div>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</section>

	<section class="full-test-section">
		<div class="full-test-card">
			<div>
				<h3>📚 Full Reading Test</h3>
				<p>Complete all 5 Teile under exam conditions</p>
			</div>
			<a href="/lesen/practice?mode=full" class="btn btn-primary">Start Full Test</a>
		</div>
	</section>
</div>

<style>
	.page-container {
		min-height: 100vh;
		padding: var(--space-lg);
		max-width: 1000px;
		margin: 0 auto;
	}

	.back-nav { margin-bottom: var(--space-xl); }
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--text-secondary);
		font-weight: 500;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}
	.back-link:hover { color: var(--text-primary); background: var(--bg-card); }
	.back-icon { font-size: 1.25rem; }

	.module-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-lg);
		animation: slideUp 0.5s ease forwards;
	}
	.header-content { display: flex; align-items: center; gap: var(--space-lg); }
	.header-icon {
		font-size: 4rem;
		padding: var(--space-lg);
		background: var(--reading-glow);
		border-radius: var(--radius-xl);
	}
	.header-text h1 { font-size: 2.5rem; color: var(--reading-primary); margin: 0; }
	.header-subtitle { font-size: 1.125rem; color: var(--text-secondary); margin: var(--space-xs) 0 0; }
	.header-meta { display: flex; gap: var(--space-sm); }
	.meta-badge {
		display: flex; align-items: center; gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-card); border: 1px solid var(--border-subtle);
		border-radius: var(--radius-full); font-size: 0.875rem; color: var(--text-secondary);
	}
	.meta-badge.progress { background: var(--reading-glow); border-color: var(--reading-primary); color: var(--reading-secondary); }

	.section-divider { height: 1px; background: var(--border-subtle); margin: var(--space-xl) 0; border: none; }

	.teile-section { animation: slideUp 0.5s ease forwards; }
	.teile-section h2 { margin-bottom: var(--space-xs); }
	.teile-section > p { color: var(--text-secondary); margin-bottom: var(--space-xl); }

	.teile-list {
		display: flex; gap: var(--space-sm); padding: var(--space-sm);
		background: var(--bg-card); border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg); margin-bottom: var(--space-lg);
	}
	.teil-trigger {
		flex: 1; padding: var(--space-md);
		background: transparent; border: none; border-radius: var(--radius-md);
		cursor: pointer; transition: all var(--transition-fast);
		font-weight: 600; color: var(--text-secondary);
	}
	.teil-trigger:hover { background: var(--bg-elevated); color: var(--text-primary); }
	:global(.teil-trigger[data-state="active"]) { background: var(--reading-glow); color: var(--reading-primary); }

	.teil-content { animation: scaleIn 0.3s ease forwards; }
	.teil-card {
		background: var(--bg-card); border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl); padding: var(--space-xl);
	}
	.teil-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-lg); }
	.teil-badge {
		display: inline-block; font-size: 0.75rem; font-weight: 600;
		text-transform: uppercase; letter-spacing: 0.05em;
		padding: var(--space-xs) var(--space-sm);
		background: var(--reading-primary); color: white;
		border-radius: var(--radius-sm); margin-bottom: var(--space-sm);
	}
	.teil-header h3 { margin: 0; font-size: 1.5rem; }
	.teil-meta { display: flex; gap: var(--space-md); font-size: 0.875rem; color: var(--text-muted); }
	.teil-description { color: var(--text-secondary); line-height: 1.6; }
	.teil-skills { display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-top: var(--space-lg); }
	.skill-chip {
		padding: var(--space-xs) var(--space-md);
		background: var(--bg-elevated); border-radius: var(--radius-full);
		font-size: 0.875rem; color: var(--text-secondary);
	}
	.teil-cta {
		display: flex; align-items: center; justify-content: space-between;
		margin-top: var(--space-lg); padding: var(--space-md) var(--space-lg);
		background: var(--reading-primary); color: white;
		border-radius: var(--radius-md); font-weight: 600;
		transition: all var(--transition-fast);
	}
	.teil-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--reading-glow); }

	.full-test-section { margin-top: var(--space-2xl); }
	.full-test-card {
		display: flex; align-items: center; justify-content: space-between; gap: var(--space-lg);
		padding: var(--space-xl); background: var(--bg-card);
		border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);
	}
	.full-test-card h3 { margin: 0; }
	.full-test-card p { margin: var(--space-xs) 0 0; color: var(--text-secondary); }

	@media (max-width: 768px) {
		.module-header { flex-direction: column; }
		.header-meta { flex-wrap: wrap; }
		.teile-list { flex-wrap: wrap; }
		.full-test-card { flex-direction: column; text-align: center; }
	}
</style>
