<script lang="ts">
	import Card from '../eav/Card.svelte';
	import type { PageData } from './$types';
	import TableForObjectArray from '$lib/TableForObjectArray.svelte';

	export let data: PageData;
</script>

<h1>Dashboard</h1>

<div class="row">
	<div class="col">
		<Card title="Upcomming Events">
			<TableForObjectArray data={data.events.future} />
		</Card>
	</div>
	<div class="col">
		<Card title="Actions">
			<TableForObjectArray data={data.actions} />
		</Card>
	</div>
</div>

<div class="row mt-4">
	<div class="col">
		<Card title="Past Events">
			<TableForObjectArray data={data.events.past} />
		</Card>
	</div>
	<div class="col">
		<Card title="Tools">
			<button class="btn btn-primary">Create New Event</button>
		</Card>
	</div>
</div>
