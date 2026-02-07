<script lang="ts">
	import { Separator, Tabs } from "bits-ui";

	const teile = [
		{
			id: "teil1",
			name: "Teil 1",
			title: "Persönlicher Brief / E-Mail",
			description: "Write a personal email or letter responding to a given situation. Include all required points.",
			duration: "25 min",
			wordCount: "~80 words",
			skills: ["Informal register", "Addressing all points", "Natural flow"]
		},
		{
			id: "teil2",
			name: "Teil 2",
			title: "Forumsbeitrag / Stellungnahme",
			description: "Write a forum post or opinion piece on a given topic. Express and justify your views.",
			duration: "25 min",
			wordCount: "~80 words",
			skills: ["Expressing opinions", "Argumentation", "Connectors"]
		}
	];

	let selectedTeil = $state("teil1");
</script>

<svelte:head>
	<title>Schreiben | Goethe Prüfung Practice</title>
</svelte:head>

<div class="page-container">
	<nav class="back-nav">
		<a href="/" class="back-link">
			<span class="back-icon">←</span>
			<span>Back to Dashboard</span>
		</a>
	</nav>

	<header class="module-header">
		<div class="header-content">
			<div class="header-icon">✍️</div>
			<div class="header-text">
				<h1>Schreiben</h1>
				<p class="header-subtitle">Writing Module</p>
			</div>
		</div>
		<div class="header-meta">
			<span class="meta-badge"><span>⏱️</span> 60 min</span>
			<span class="meta-badge"><span>📋</span> 2 Teile</span>
			<span class="meta-badge progress">64% mastery</span>
		</div>
	</header>

	<Separator.Root decorative class="section-divider" />

	<section class="teile-section">
		<h2>Select a Teil to Practice</h2>
		<p>Improve your written German with AI-powered feedback</p>

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
								<span>📝 {teil.wordCount}</span>
							</div>
						</div>
						<p class="teil-description">{teil.description}</p>
						<div class="teil-skills">
							{#each teil.skills as skill}
								<span class="skill-chip">{skill}</span>
							{/each}
						</div>

						<div class="writing-tips">
							<h4>💡 Key Points for Success</h4>
							<ul>
								<li>Address all required points in the task</li>
								<li>Use appropriate connectors (außerdem, deshalb, trotzdem)</li>
								<li>Check your grammar and spelling</li>
								<li>Stay within the word limit</li>
							</ul>
						</div>

						<a href="/schreiben/practice?teil={teil.id}" class="teil-cta">
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
				<h3>✍️ Full Writing Test</h3>
				<p>Complete both Teile under exam conditions</p>
			</div>
			<a href="/schreiben/practice?mode=full" class="btn btn-primary">Start Full Test</a>
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
		display: inline-flex; align-items: center; gap: var(--space-sm);
		color: var(--text-secondary); font-weight: 500;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md); transition: all var(--transition-fast);
	}
	.back-link:hover { color: var(--text-primary); background: var(--bg-card); }
	.back-icon { font-size: 1.25rem; }

	.module-header {
		display: flex; justify-content: space-between; align-items: flex-start;
		gap: var(--space-lg); animation: slideUp 0.5s ease forwards;
	}
	.header-content { display: flex; align-items: center; gap: var(--space-lg); }
	.header-icon {
		font-size: 4rem; padding: var(--space-lg);
		background: var(--writing-glow); border-radius: var(--radius-xl);
	}
	.header-text h1 { font-size: 2.5rem; color: var(--writing-primary); margin: 0; }
	.header-subtitle { font-size: 1.125rem; color: var(--text-secondary); margin: var(--space-xs) 0 0; }
	.header-meta { display: flex; gap: var(--space-sm); }
	.meta-badge {
		display: flex; align-items: center; gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-card); border: 1px solid var(--border-subtle);
		border-radius: var(--radius-full); font-size: 0.875rem; color: var(--text-secondary);
	}
	.meta-badge.progress { background: var(--writing-glow); border-color: var(--writing-primary); color: var(--writing-secondary); }

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
	:global(.teil-trigger[data-state="active"]) { background: var(--writing-glow); color: var(--writing-primary); }

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
		background: var(--writing-primary); color: white;
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

	.writing-tips {
		margin-top: var(--space-lg);
		padding: var(--space-lg);
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		border-left: 3px solid var(--writing-primary);
	}
	.writing-tips h4 { margin: 0 0 var(--space-md); font-size: 1rem; }
	.writing-tips ul { margin: 0; padding-left: var(--space-lg); color: var(--text-secondary); }
	.writing-tips li { margin-bottom: var(--space-sm); }

	.teil-cta {
		display: flex; align-items: center; justify-content: space-between;
		margin-top: var(--space-lg); padding: var(--space-md) var(--space-lg);
		background: var(--writing-primary); color: white;
		border-radius: var(--radius-md); font-weight: 600;
		transition: all var(--transition-fast);
	}
	.teil-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--writing-glow); }

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
