<script lang="ts">
	import { Progress, Separator, Tabs } from "bits-ui";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	const readiness = 62;

	const skillTracks = [
		{
			id: "reading",
			name: "Reading",
			level: "Goethe-style texts",
			target: "18 tasks",
			focus: "Text structure and detail extraction",
			accent: "reading",
			score: "71%"
		},
		{
			id: "writing",
			name: "Writing",
			level: "Argument + formal email",
			target: "2 prompts",
			focus: "Connectors, tone, and clear paragraph flow",
			accent: "writing",
			score: "64%"
		},
		{
			id: "listening",
			name: "Listening",
			level: "Announcements + interviews",
			target: "12 clips",
			focus: "Fast keyword capture under time pressure",
			accent: "listening",
			score: "68%"
		},
		{
			id: "speaking",
			name: "Speaking",
			level: "Part 1-3 simulation",
			target: "4 drills",
			focus: "Fluency and argument structure",
			accent: "speaking",
			score: "59%"
		}
	];

	let activeTrack = $state("reading");
</script>

{#if !data.isAuthenticated}
	<h1>Goethe App</h1>
	<p>
		Magic-link auth is available at <a href="/auth">/auth</a>.
	</p>
{:else}
	<div class="app-shell">
		<section class="hero">
			<p class="eyebrow">Goethe Placement Test</p>
			<h1>Willkommen, {data.user?.name ?? data.user?.email ?? "Learner"}.</h1>
			<p>
				Train each module, then run a full placement simulation to estimate your CEFR level from A1 to
				C1.
			</p>
			<div class="hero-actions">
				<a class="btn btn-primary" href="/auth">Open account</a>
				<button class="btn btn-subtle" type="button">Start full test</button>
			</div>
			<div class="meter-wrap">
				<p class="meter-title">Placement readiness</p>
				<Progress.Root class="meter-bar" value={readiness} max={100} aria-label="Placement readiness">
					<div class="meter-indicator" style={`width:${readiness}%`}></div>
				</Progress.Root>
				<p class="meter-caption">{readiness}% complete toward B1 placement confidence</p>
			</div>
		</section>

		<Separator.Root decorative class="section-rule" />

		<section class="main-grid">
			<article class="panel panel-large">
				<div class="panel-head">
					<h2>Skill Arena</h2>
					<p>Build confidence across all 4 scored sections with Bits UI tabs</p>
				</div>
				<Tabs.Root bind:value={activeTrack} class="skill-tabs">
					<Tabs.List class="tabs-list" aria-label="Placement modules">
						{#each skillTracks as skill}
							<Tabs.Trigger class={`tabs-trigger ${skill.accent}`} value={skill.id}>
								{skill.name}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>

					{#each skillTracks as skill}
						<Tabs.Content class="tabs-content" value={skill.id}>
							<div class={`skill-card ${skill.accent}`}>
								<div>
									<p class="track-name">{skill.name}</p>
									<p class="track-level">{skill.level}</p>
								</div>
								<p class="track-focus">{skill.focus}</p>
								<div class="track-meta">
									<span>{skill.target}</span>
									<strong>{skill.score}</strong>
								</div>
								<button type="button">Resume {skill.name}</button>
							</div>
						</Tabs.Content>
					{/each}
				</Tabs.Root>
			</article>

			<article class="panel">
				<div class="panel-head">
					<h2>Today&apos;s Sprint</h2>
					<p>Recommended next session</p>
				</div>
				<ul class="task-list">
					<li>
						<span>1</span>
						<div>
							<p>Reading: matching headlines</p>
							<small>8 minutes</small>
						</div>
					</li>
					<li>
						<span>2</span>
						<div>
							<p>Listening: railway announcement</p>
							<small>6 minutes</small>
						</div>
					</li>
					<li>
						<span>3</span>
						<div>
							<p>Speaking: self-introduction prompt</p>
							<small>4 minutes</small>
						</div>
					</li>
				</ul>
			</article>

			<article class="panel">
				<div class="panel-head">
					<h2>Mock Exam Radar</h2>
					<p>Last simulation summary</p>
				</div>
				<div class="score-grid">
					<div>
						<p>Reading</p>
						<strong>71%</strong>
					</div>
					<div>
						<p>Writing</p>
						<strong>64%</strong>
					</div>
					<div>
						<p>Listening</p>
						<strong>68%</strong>
					</div>
					<div>
						<p>Speaking</p>
						<strong>59%</strong>
					</div>
				</div>
				<p class="footnote">Trend: focus speaking fluency to move from A2+ to solid B1.</p>
			</article>
		</section>
	</div>
{/if}

<style>
	.app-shell {
		--bg: #f4f0e9;
		--ink: #1f1d1a;
		--panel: #fffdf8;
		--line: #d8d0c4;
		--accent: #cb5f2f;
		--accent-2: #008064;
		--accent-3: #1f5ab8;
		--accent-4: #8a3ab4;
		--title-font: "Avenir Next Condensed", "Franklin Gothic Medium", "Trebuchet MS", sans-serif;
		--body-font: "IBM Plex Sans", "Segoe UI Variable Text", "Trebuchet MS", sans-serif;
		background:
			radial-gradient(circle at 10% 10%, #ffe9d9 0%, transparent 30%),
			radial-gradient(circle at 90% 15%, #d8f4ef 0%, transparent 35%),
			var(--bg);
		color: var(--ink);
		min-height: 100vh;
		padding: clamp(1rem, 2vw, 2.25rem);
		font-family: var(--body-font);
	}

	.hero {
		background: linear-gradient(130deg, #fffdf8, #f8f1e7);
		border: 1px solid var(--line);
		border-radius: 1.5rem;
		padding: clamp(1.2rem, 3vw, 2rem);
		box-shadow: 0 24px 50px -38px rgba(27, 22, 14, 0.7);
		animation: rise 360ms ease-out both;
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.09em;
		font-size: 0.8rem;
		color: #6f6559;
		margin: 0;
	}

	h1,
	h2 {
		font-family: var(--title-font);
		letter-spacing: 0.01em;
	}

	.hero h1 {
		margin: 0.35rem 0;
		font-size: clamp(1.7rem, 4vw, 2.9rem);
	}

	.hero p {
		margin: 0;
		max-width: 62ch;
		line-height: 1.5;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.1rem;
	}

	.btn {
		font: inherit;
		font-weight: 600;
		padding: 0.62rem 1rem;
		border-radius: 999px;
		border: 1px solid transparent;
		text-decoration: none;
		cursor: pointer;
	}

	.btn-primary {
		background: var(--ink);
		color: #fff;
	}

	.btn-subtle {
		background: #fff;
		border-color: var(--line);
		color: var(--ink);
	}

	.meter-wrap {
		margin-top: 1.1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
	}

	.meter-title {
		font-size: 0.9rem;
		color: #5e574e;
	}

	.meter-bar {
		background: #e9e1d5;
		height: 0.7rem;
		border-radius: 999px;
		overflow: hidden;
		margin: 0.4rem 0 0.3rem;
	}

	.meter-indicator {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, #e68051, #cb5f2f);
		border-radius: 999px;
	}

	.meter-caption {
		font-size: 0.9rem;
		color: #5e574e;
	}

	.main-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 0.9rem;
	}

	.section-rule {
		margin: 1rem 0 0.5rem;
		height: 1px;
		background: var(--line);
	}

	.panel {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 1.25rem;
		padding: 1rem;
		box-shadow: 0 14px 32px -30px rgba(26, 21, 14, 0.65);
		animation: rise 500ms ease-out both;
	}

	.panel-large {
		grid-column: span 12;
		animation-delay: 90ms;
	}

	.main-grid .panel:nth-child(2) {
		grid-column: span 7;
		animation-delay: 150ms;
	}

	.main-grid .panel:nth-child(3) {
		grid-column: span 5;
		animation-delay: 210ms;
	}

	.panel-head h2 {
		margin: 0;
		font-size: 1.32rem;
	}

	.panel-head p {
		margin: 0.28rem 0 0;
		color: #685f53;
	}

	.skill-tabs {
		margin-top: 0.95rem;
	}

	.tabs-list {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.5rem;
		background: #f3ebde;
		padding: 0.4rem;
		border-radius: 0.9rem;
		border: 1px solid #e4d9ca;
	}

	.tabs-trigger {
		background: transparent;
		border: 0;
		border-radius: 0.7rem;
		font: inherit;
		font-weight: 650;
		padding: 0.55rem 0.4rem;
		cursor: pointer;
		color: #5f5548;
		transition:
			background 180ms ease,
			color 180ms ease,
			transform 180ms ease;
	}

	:global(.tabs-trigger[data-state="active"]) {
		background: #fff;
		color: #1f1a14;
		transform: translateY(-1px);
		box-shadow: 0 10px 18px -15px rgba(24, 18, 10, 0.55);
	}

	.tabs-content {
		margin-top: 0.75rem;
	}

	.skill-card {
		border-radius: 1rem;
		padding: 1rem;
		background: #fff;
		border: 1px solid #e8ded1;
		display: grid;
		gap: 0.6rem;
	}

	.track-focus {
		margin: 0;
		color: #5b5145;
	}

	.track-meta {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}

	.track-meta span {
		color: #6e6559;
	}

	.track-meta strong {
		font-size: 1.35rem;
	}

	.skill-card button {
		border: 0;
		background: #191613;
		color: #fff;
		padding: 0.45rem 0.65rem;
		border-radius: 0.7rem;
		font: inherit;
		font-size: 0.87rem;
		cursor: pointer;
		width: fit-content;
	}

	.track-name {
		font-weight: 700;
		margin: 0;
	}

	.track-level,
	.track-target {
		margin: 0.25rem 0;
		color: #594f45;
	}

	.reading {
		box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent) 30%, white);
	}

	.writing {
		box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent-2) 34%, white);
	}

	.listening {
		box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent-3) 32%, white);
	}

	.speaking {
		box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent-4) 36%, white);
	}

	.task-list {
		list-style: none;
		padding: 0;
		margin: 0.9rem 0 0;
		display: grid;
		gap: 0.6rem;
	}

	.task-list li {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.55rem;
		background: #fff;
		border: 1px solid #ece4d8;
		border-radius: 0.85rem;
	}

	.task-list span {
		width: 1.65rem;
		height: 1.65rem;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: #f3ebde;
		font-weight: 700;
	}

	.task-list p {
		margin: 0;
		font-weight: 600;
	}

	.task-list small {
		color: #716758;
	}

	.score-grid {
		margin-top: 0.9rem;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.score-grid div {
		border: 1px solid #ece4d8;
		border-radius: 0.8rem;
		padding: 0.6rem;
		background: #fff;
	}

	.score-grid p {
		margin: 0;
		color: #6f6658;
		font-size: 0.88rem;
	}

	.score-grid strong {
		font-size: 1.35rem;
	}

	.footnote {
		margin: 0.8rem 0 0;
		font-size: 0.93rem;
		color: #5f5547;
	}

	@keyframes rise {
		from {
			transform: translateY(10px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (max-width: 860px) {
		.tabs-list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.main-grid .panel:nth-child(2),
		.main-grid .panel:nth-child(3) {
			grid-column: span 12;
		}
	}
</style>
