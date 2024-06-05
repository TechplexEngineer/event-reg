<script lang="ts">
	let events = [
		{
			name: 'New England Robotics Derby',
			dateStr: 'October 12, 2024',
			eventSlug: 'nerd24', // often the same as eventCode but can be entered before the eventCode is assgined
			program: 'FRC'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="mb-4">Welcome to Event Registration</h1>

	<h3>Upcomming Events</h3>
	{#each events as event}
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">{event.name}</h5>
				<h6 class="card-subtitle mb-2 text-body-secondary">{event.dateStr}</h6>
				<!-- <p class="card-text">
					Some quick example text to build on the card title and make up the bulk of the card's
					content.
				</p> -->
				<a href="event/{event.eventSlug}" class="card-link">Team List</a>
				<a href="event/{event.eventSlug}/register" class="card-link">Register</a>
				<a href="event/{event.eventSlug}/volunteer" class="card-link">Volunteer</a>
			</div>
		</div>
	{/each}
</section>

<style>
</style>
