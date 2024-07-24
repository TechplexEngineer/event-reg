<script lang="ts">
	import Ff from '$lib/components/FF.svelte';

	const tools = [
		{
			name: 'Video Time Study',
			description: 'Annotate video tracking events and durations.'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Amazon Robotics Process Engineer Tools" />
</svelte:head>
<div class="container">
	<section>
		<h1 class="mb-4">Welcome to AR PE Tools</h1>

		{#each tools as tool}
			<div class="card mt-4">
				<div class="card-body">
					<h5 class="card-title">{tool.name}</h5>
					<h6 class="card-subtitle mb-2 text-body-secondary">{tool.description}</h6>
					<a href="/video" class="btn btn-primary">Try it <Ff /></a>
				</div>
			</div>
		{/each}
	</section>
</div>

<style>
</style>
