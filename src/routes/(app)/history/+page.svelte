<script lang="ts">
	const history = [
		{
			date: "Today",
			module: "Lesen",
			step: "Teil 2: Zeitungsartikel",
			score: "85%",
			duration: "18m"
		},
		{
			date: "Yesterday",
			module: "Horen",
			step: "Teil 1: Ansagen",
			score: "72%",
			duration: "14m"
		},
		{
			date: "2 days ago",
			module: "Sprechen",
			step: "Teil 2: Prasentation",
			score: "Reviewed",
			duration: "22m"
		},
		{
			date: "3 days ago",
			module: "Schreiben",
			step: "Teil 1: Email Antwort",
			score: "Pending",
			duration: "27m"
		}
	];
</script>

<div class="app-container">
	<header class="header">
		<p class="eyebrow">Practice Timeline</p>
		<h1>History</h1>
		<p>See each completed practice step in chronological order.</p>
	</header>

	<hr class="section-divider" />

	<section class="history-card">
		<ul class="history-list">
			{#each history as item}
				<li class="history-row">
					<div class="history-main">
						<p class="history-step">{item.module}: {item.step}</p>
						<p class="history-meta">{item.date} . {item.duration}</p>
					</div>
					<span class="history-score">{item.score}</span>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.app-container {
		padding-bottom: var(--space-lg);
	}

	.header h1 {
		margin-top: var(--space-xs);
	}

	.header p {
		margin-top: var(--space-sm);
	}

	.eyebrow {
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.section-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-xl) 0;
		border: none;
	}

	.history-card {
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
	}

	.history-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--space-sm);
	}

	.history-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
	}

	.history-step {
		margin: 0;
		font-weight: 600;
	}

	.history-meta {
		margin: 0.25rem 0 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.history-score {
		font-weight: 700;
		color: var(--speaking-primary);
	}

</style>
