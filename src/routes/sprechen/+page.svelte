<script lang="ts">
	import { Accordion, Dialog, RadioGroup, Separator, Tabs } from "bits-ui";

	let selectedMode = $state<"full" | "teil">("full");
	let selectedTeil = $state<string>("teil1");
	let showStartDialog = $state(false);

	const teile = [
		{
			id: "teil1",
			name: "Teil 1",
			title: "Gemeinsam etwas planen",
			description: "Plan something together with your partner. You'll receive a scenario and must discuss and agree on details.",
			duration: "3 min",
			skills: ["Negotiation", "Making suggestions", "Agreeing/Disagreeing"],
			example: "You and your friend want to organize a birthday party. Discuss and decide on the details.",
			tips: [
				"Start with an opening phrase like 'Also, ich schlage vor...'",
				"React to your partner's suggestions",
				"Use connectors like 'außerdem', 'einerseits...andererseits'",
				"Come to a clear conclusion"
			]
		},
		{
			id: "teil2",
			name: "Teil 2",
			title: "Ein Thema präsentieren",
			description: "Give a short presentation on a given topic. Structure your talk with introduction, main points, and conclusion.",
			duration: "4 min",
			skills: ["Presentation structure", "Expressing opinions", "Personal experience"],
			example: "Present on the topic 'Learning a foreign language' - advantages, disadvantages, and your personal experience.",
			tips: [
				"Structure: Introduction → Main points → Personal opinion → Conclusion",
				"Use phrases like 'Ich möchte heute über... sprechen'",
				"Give concrete examples from your experience",
				"End with a clear summary"
			]
		},
		{
			id: "teil3",
			name: "Teil 3",
			title: "Über ein Thema sprechen",
			description: "Discuss the topic from Teil 2 with your partner. Ask questions, express opinions, and react appropriately.",
			duration: "3 min",
			skills: ["Discussion", "Asking questions", "Reacting to opinions"],
			example: "After your partner's presentation about 'Learning a foreign language', ask follow-up questions and share your views.",
			tips: [
				"Listen carefully to the presentation",
				"Ask genuine questions about the topic",
				"Share your own perspective with 'Meiner Meinung nach...'",
				"Show interest with phrases like 'Das finde ich interessant...'"
			]
		}
	];

	function startPractice() {
		showStartDialog = true;
	}

	function confirmStart() {
		showStartDialog = false;
		// Navigate to practice session
		if (selectedMode === "full") {
			window.location.href = "/sprechen/practice?mode=full";
		} else {
			window.location.href = `/sprechen/practice?mode=teil&teil=${selectedTeil}`;
		}
	}
</script>

<svelte:head>
	<title>Sprechen | Goethe Prüfung Practice</title>
	<meta name="description" content="Practice the Speaking module of the Goethe exam with AI-powered feedback." />
</svelte:head>

<div class="page-container">
	<!-- Back Navigation -->
	<nav class="back-nav">
		<a href="/" class="back-link">
			<span class="back-icon">←</span>
			<span>Back to Dashboard</span>
		</a>
	</nav>

	<!-- Header -->
	<header class="module-header">
		<div class="header-content">
			<div class="header-icon">🎤</div>
			<div class="header-text">
				<h1>Sprechen</h1>
				<p class="header-subtitle">Speaking Module</p>
			</div>
		</div>
		<div class="header-meta">
			<span class="meta-badge">
				<span>⏱️</span>
				~15 min
			</span>
			<span class="meta-badge">
				<span>📋</span>
				3 Teile
			</span>
			<span class="meta-badge progress">
				59% mastery
			</span>
		</div>
	</header>

	<Separator.Root decorative class="section-divider" />

	<!-- Mode Selection -->
	<section class="mode-section">
		<h2>Choose Practice Mode</h2>
		<p>Take the full speaking test or focus on a specific part</p>

		<RadioGroup.Root bind:value={selectedMode} class="mode-grid">
			<label class="mode-card" class:selected={selectedMode === "full"}>
				<RadioGroup.Item value="full" class="radio-input" />
				<div class="mode-content">
					<div class="mode-icon-wrap full">
						<span class="mode-icon">🎯</span>
					</div>
					<div class="mode-details">
						<h3>Full Speaking Test</h3>
						<p>Complete all 3 parts in sequence, simulating real exam conditions</p>
						<div class="mode-info">
							<span>⏱️ ~15 minutes</span>
							<span>📋 All 3 Teile</span>
						</div>
					</div>
					<div class="mode-check">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<path d="M5 12l5 5L20 7" />
						</svg>
					</div>
				</div>
			</label>

			<label class="mode-card" class:selected={selectedMode === "teil"}>
				<RadioGroup.Item value="teil" class="radio-input" />
				<div class="mode-content">
					<div class="mode-icon-wrap teil">
						<span class="mode-icon">🔍</span>
					</div>
					<div class="mode-details">
						<h3>Individual Teil</h3>
						<p>Focus on one specific part for targeted practice and improvement</p>
						<div class="mode-info">
							<span>⏱️ 3-4 minutes</span>
							<span>📋 1 Teil</span>
						</div>
					</div>
					<div class="mode-check">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<path d="M5 12l5 5L20 7" />
						</svg>
					</div>
				</div>
			</label>
		</RadioGroup.Root>
	</section>

	<!-- Teil Selection (when individual Teil is selected) -->
	{#if selectedMode === "teil"}
		<section class="teil-section">
			<h2>Select a Teil</h2>
			<p>Choose which part of the speaking exam you want to practice</p>

			<Tabs.Root bind:value={selectedTeil} class="teil-tabs">
				<Tabs.List class="teil-list">
					{#each teile as teil}
						<Tabs.Trigger value={teil.id} class="teil-trigger">
							<span class="teil-num">{teil.name}</span>
							<span class="teil-title">{teil.title}</span>
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
								<span class="teil-duration">⏱️ {teil.duration}</span>
							</div>
							
							<p class="teil-description">{teil.description}</p>
							
							<div class="teil-skills">
								<span class="skills-label">Skills tested:</span>
								<div class="skills-list">
									{#each teil.skills as skill}
										<span class="skill-chip">{skill}</span>
									{/each}
								</div>
							</div>

							<div class="teil-example">
								<span class="example-label">Example task:</span>
								<p class="example-text">"{teil.example}"</p>
							</div>

							<Accordion.Root class="tips-accordion">
								<Accordion.Item value="tips" class="tips-item">
									<Accordion.Header>
										<Accordion.Trigger class="tips-trigger">
											<span>💡 Tips for this Teil</span>
											<span class="trigger-icon">+</span>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content class="tips-content">
										<ul class="tips-list">
											{#each teil.tips as tip}
												<li>{tip}</li>
											{/each}
										</ul>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</div>
					</Tabs.Content>
				{/each}
			</Tabs.Root>
		</section>
	{/if}

	<!-- Teile Overview (when full test is selected) -->
	{#if selectedMode === "full"}
		<section class="overview-section">
			<h2>Test Overview</h2>
			<p>You'll complete all three parts in the following order</p>

			<div class="overview-timeline">
				{#each teile as teil, i}
					<div class="timeline-item">
						<div class="timeline-marker">
							<span class="marker-num">{i + 1}</span>
							{#if i < teile.length - 1}
								<div class="marker-line"></div>
							{/if}
						</div>
						<div class="timeline-content">
							<div class="timeline-header">
								<h3>{teil.name}: {teil.title}</h3>
								<span class="timeline-duration">{teil.duration}</span>
							</div>
							<p>{teil.description}</p>
							<div class="timeline-skills">
								{#each teil.skills as skill}
									<span class="skill-chip small">{skill}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Start Button -->
	<div class="start-section">
		<button class="start-button" onclick={startPractice}>
			<span class="start-icon">▶</span>
			<span>Start {selectedMode === "full" ? "Full Test" : teile.find(t => t.id === selectedTeil)?.name}</span>
		</button>
		<p class="start-hint">
			{#if selectedMode === "full"}
				You'll practice all 3 parts with short breaks between each
			{:else}
				Focus practice on {teile.find(t => t.id === selectedTeil)?.title}
			{/if}
		</p>
	</div>
</div>

<!-- Start Confirmation Dialog -->
<Dialog.Root bind:open={showStartDialog}>
	<Dialog.Portal>
		<Dialog.Overlay class="dialog-overlay" />
		<Dialog.Content class="dialog-content">
			<Dialog.Title class="dialog-title">Ready to Start?</Dialog.Title>
			<Dialog.Description class="dialog-description">
				{#if selectedMode === "full"}
					You're about to start the full speaking test with all 3 Teile. This will take approximately 15 minutes.
				{:else}
					You're about to practice {teile.find(t => t.id === selectedTeil)?.name}: {teile.find(t => t.id === selectedTeil)?.title}. This will take approximately {teile.find(t => t.id === selectedTeil)?.duration}.
				{/if}
			</Dialog.Description>
			<div class="dialog-checklist">
				<p>Before you begin:</p>
				<ul>
					<li>✓ Find a quiet place to speak</li>
					<li>✓ Make sure your microphone works</li>
					<li>✓ Prepare to speak clearly in German</li>
				</ul>
			</div>
			<div class="dialog-actions">
				<button class="btn btn-secondary" onclick={() => showStartDialog = false}>Cancel</button>
				<button class="btn btn-primary" onclick={confirmStart}>Start Practice</button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style>
	.page-container {
		min-height: 100vh;
		padding: var(--space-lg);
		max-width: 1000px;
		margin: 0 auto;
	}

	/* === Back Navigation === */
	.back-nav {
		margin-bottom: var(--space-xl);
		animation: slideDown 0.4s ease forwards;
	}

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

	.back-link:hover {
		color: var(--text-primary);
		background: var(--bg-card);
	}

	.back-icon {
		font-size: 1.25rem;
	}

	/* === Header === */
	.module-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-lg);
		animation: slideUp 0.5s ease forwards;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	.header-icon {
		font-size: 4rem;
		padding: var(--space-lg);
		background: var(--speaking-glow);
		border-radius: var(--radius-xl);
	}

	.header-text h1 {
		font-size: 2.5rem;
		color: var(--speaking-primary);
		margin: 0;
	}

	.header-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: var(--space-xs) 0 0;
	}

	.header-meta {
		display: flex;
		gap: var(--space-sm);
	}

	.meta-badge {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.meta-badge.progress {
		background: var(--speaking-glow);
		border-color: var(--speaking-primary);
		color: var(--speaking-secondary);
	}

	/* === Section Divider === */
	.section-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-xl) 0;
		border: none;
	}

	/* === Mode Selection === */
	.mode-section {
		animation: slideUp 0.5s ease forwards;
		animation-delay: 0.1s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.mode-section h2 {
		margin-bottom: var(--space-xs);
	}

	.mode-section > p {
		color: var(--text-secondary);
		margin-bottom: var(--space-xl);
	}

	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-lg);
	}

	.mode-card {
		position: relative;
		cursor: pointer;
		background: var(--bg-card);
		border: 2px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
		transition: all var(--transition-normal);
	}

	.mode-card:hover {
		border-color: var(--border-default);
		background: var(--bg-card-hover);
	}

	.mode-card.selected {
		border-color: var(--speaking-primary);
		background: var(--bg-card-hover);
		box-shadow: var(--shadow-glow) var(--speaking-glow);
	}

	.radio-input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.mode-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.mode-icon-wrap {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		font-size: 1.75rem;
	}

	.mode-icon-wrap.full {
		background: linear-gradient(135deg, var(--speaking-glow), var(--writing-glow));
	}

	.mode-icon-wrap.teil {
		background: var(--speaking-glow);
	}

	.mode-details h3 {
		font-size: 1.25rem;
		margin: 0 0 var(--space-xs);
	}

	.mode-details p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.mode-info {
		display: flex;
		gap: var(--space-md);
		margin-top: var(--space-sm);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.mode-check {
		position: absolute;
		top: var(--space-lg);
		right: var(--space-lg);
		width: 28px;
		height: 28px;
		border: 2px solid var(--border-default);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: scale(0.8);
		transition: all var(--transition-fast);
	}

	.mode-card.selected .mode-check {
		opacity: 1;
		transform: scale(1);
		background: var(--speaking-primary);
		border-color: var(--speaking-primary);
		color: white;
	}

	.mode-check svg {
		width: 14px;
		height: 14px;
	}

	/* === Teil Section === */
	.teil-section {
		margin-top: var(--space-2xl);
		animation: slideUp 0.4s ease forwards;
	}

	.teil-section h2 {
		margin-bottom: var(--space-xs);
	}

	.teil-section > p {
		color: var(--text-secondary);
		margin-bottom: var(--space-xl);
	}

	.teil-tabs {
		margin-top: var(--space-lg);
	}

	.teil-list {
		display: flex;
		gap: var(--space-sm);
		padding: var(--space-sm);
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-lg);
	}

	.teil-trigger {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		color: var(--text-secondary);
	}

	.teil-trigger:hover {
		background: var(--bg-elevated);
		color: var(--text-primary);
	}

	:global(.teil-trigger[data-state="active"]) {
		background: var(--speaking-glow);
		color: var(--speaking-primary);
	}

	.teil-num {
		font-weight: 700;
		font-size: 0.875rem;
	}

	.teil-title {
		font-size: 0.75rem;
		text-align: center;
	}

	.teil-content {
		animation: scaleIn 0.3s ease forwards;
	}

	.teil-card {
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
	}

	.teil-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-lg);
	}

	.teil-badge {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: var(--space-xs) var(--space-sm);
		background: var(--speaking-primary);
		color: white;
		border-radius: var(--radius-sm);
		margin-bottom: var(--space-sm);
	}

	.teil-header h3 {
		margin: 0;
		font-size: 1.5rem;
	}

	.teil-duration {
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.teil-description {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.teil-skills {
		margin-top: var(--space-lg);
	}

	.skills-label {
		font-size: 0.875rem;
		color: var(--text-muted);
		display: block;
		margin-bottom: var(--space-sm);
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.skill-chip {
		padding: var(--space-xs) var(--space-md);
		background: var(--bg-elevated);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.skill-chip.small {
		font-size: 0.75rem;
		padding: var(--space-xs) var(--space-sm);
	}

	.teil-example {
		margin-top: var(--space-lg);
		padding: var(--space-lg);
		background: var(--bg-elevated);
		border-left: 3px solid var(--speaking-primary);
		border-radius: var(--radius-md);
	}

	.example-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		display: block;
		margin-bottom: var(--space-sm);
	}

	.example-text {
		font-style: italic;
		color: var(--text-secondary);
		margin: 0;
	}

	.tips-accordion {
		margin-top: var(--space-lg);
	}

	.tips-item {
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.tips-trigger {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-md) var(--space-lg);
		background: transparent;
		border: none;
		font: inherit;
		font-weight: 500;
		color: var(--text-primary);
		cursor: pointer;
	}

	.trigger-icon {
		font-size: 1.25rem;
		font-weight: 300;
		transition: transform var(--transition-fast);
	}

	:global(.tips-trigger[data-state="open"]) .trigger-icon {
		transform: rotate(45deg);
	}

	.tips-content {
		padding: 0 var(--space-lg) var(--space-lg);
	}

	.tips-list {
		margin: 0;
		padding-left: var(--space-lg);
		color: var(--text-secondary);
	}

	.tips-list li {
		margin-bottom: var(--space-sm);
	}

	/* === Overview Section === */
	.overview-section {
		margin-top: var(--space-2xl);
		animation: slideUp 0.4s ease forwards;
	}

	.overview-section h2 {
		margin-bottom: var(--space-xs);
	}

	.overview-section > p {
		color: var(--text-secondary);
		margin-bottom: var(--space-xl);
	}

	.overview-timeline {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.timeline-item {
		display: flex;
		gap: var(--space-lg);
	}

	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.marker-num {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--speaking-primary);
		color: white;
		font-weight: 700;
		border-radius: 50%;
	}

	.marker-line {
		width: 2px;
		flex: 1;
		background: var(--border-default);
		margin-top: var(--space-sm);
	}

	.timeline-content {
		flex: 1;
		padding-bottom: var(--space-lg);
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-sm);
	}

	.timeline-header h3 {
		margin: 0;
		font-size: 1.125rem;
	}

	.timeline-duration {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.timeline-content > p {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.timeline-skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-sm);
	}

	/* === Start Section === */
	.start-section {
		margin-top: var(--space-3xl);
		text-align: center;
		animation: slideUp 0.5s ease forwards;
		animation-delay: 0.2s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.start-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-lg) var(--space-2xl);
		background: linear-gradient(135deg, var(--speaking-primary), var(--speaking-secondary));
		color: #ffffff;
		font-family: var(--font-body);
		font-size: 1.125rem;
		font-weight: 700;
		border: none;
		border-radius: var(--radius-xl);
		cursor: pointer;
		transition: all var(--transition-normal);
		box-shadow: 0 8px 32px var(--speaking-glow);
	}

	.start-button:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 12px 40px var(--speaking-glow);
	}

	.start-icon {
		font-size: 1.25rem;
	}

	.start-hint {
		margin-top: var(--space-md);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* === Dialog === */
	:global(.dialog-overlay) {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.45);
		backdrop-filter: blur(4px);
		z-index: 100;
		animation: fadeIn 0.2s ease forwards;
	}

	:global(.dialog-content) {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 480px;
		background: var(--bg-card);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
		z-index: 101;
		animation: scaleIn 0.3s ease forwards;
	}

	:global(.dialog-title) {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		margin: 0 0 var(--space-sm);
	}

	:global(.dialog-description) {
		color: var(--text-secondary);
		margin: 0;
	}

	.dialog-checklist {
		margin-top: var(--space-lg);
		padding: var(--space-md);
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
	}

	.dialog-checklist p {
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-sm);
	}

	.dialog-checklist ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.dialog-checklist li {
		color: var(--speaking-secondary);
		padding: var(--space-xs) 0;
	}

	.dialog-actions {
		display: flex;
		gap: var(--space-md);
		justify-content: flex-end;
		margin-top: var(--space-xl);
	}

	/* === Responsive === */
	@media (max-width: 768px) {
		.module-header {
			flex-direction: column;
		}

		.header-meta {
			flex-wrap: wrap;
		}

		.mode-grid {
			grid-template-columns: 1fr;
		}

		.teil-list {
			flex-direction: column;
		}

		.timeline-item {
			flex-direction: column;
			gap: var(--space-md);
		}

		.timeline-marker {
			flex-direction: row;
		}

		.marker-line {
			display: none;
		}
	}
</style>
