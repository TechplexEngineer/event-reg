<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import TableForObjectArray, {
		type TableColumns
	} from '$lib/components/TableForObjectArray.svelte';
	import { formatUnix2Long } from '$lib/dateutil';
	import type { PageData } from './$types';

	export let data: PageData;

	const eventColumns: TableColumns = [
		'name',
		{
			data: 'date',
			title: 'Date',
			render: (val) => {
				return formatUnix2Long(val);
			}
		},
		{
			data: 'name',
			title: 'Actions',
			renderHTML: (val) => {
				return `<a href="/event/${val}" class="btn btn-primary">Open</a>`;
			}
		}
	];
	const actionsColumns: TableColumns = [
		'for',
		'title',
		{
			data: 'dueDate',
			title: 'Due Date',
			render: (val: number) => {
				return formatUnix2Long(val);
			}
		},
		{
			data: 'id',
			title: 'Actions',
			renderHTML: (id) => {
				return `<a href="/action/${id}" class="btn btn-warning">Resolve</a>`;
			}
		}
	];

	console.log('actionsColumns', actionsColumns);
</script>

<h1>Dashboard</h1>

<div class="row">
	<div class="col">
		<Card title="Upcomming Events">
			<TableForObjectArray data={data.events.future} columns={eventColumns} />
		</Card>
		<Card title="Past Events" class="mt-4">
			<TableForObjectArray data={data.events.past} columns={eventColumns} />
		</Card>
	</div>
	<div class="col">
		<Card title="Actions">
			<TableForObjectArray data={data.actions} columns={actionsColumns} />
		</Card>
		<Card title="Tools" class="mt-4">
			<a href="/event/new" class="btn btn-primary">Create New Event</a>
		</Card>
	</div>
</div>

<div class="row mt-4">
	<div class="col"></div>
	<div class="col"></div>
</div>
