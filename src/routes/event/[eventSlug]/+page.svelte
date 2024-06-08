<script lang="ts">
	import { page } from '$app/stores';
	import TableForObjectArray from '$lib/TableForObjectArray.svelte';

	const columns = [
		'name',
		'type',
		'number',
		{
			data: 'location',
			title: 'Location'
		}
	];
</script>

<div class="d-flex">
	<h1>{$page.data.event.name}</h1>
	<div class="ms-auto">
		<a href="/event/{$page.data.event.slug}/edit" class="btn btn-primary">Edit Event</a>
		<a href="/my/{$page.data.event.slug}" class="btn btn-primary">Manage Registration</a>
	</div>
</div>

<h2>Teams</h2>

<TableForObjectArray data={$page.data.teams} {columns} />
