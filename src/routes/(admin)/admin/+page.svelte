<script lang="ts">
	import TableForObjectArray, {
		type TableColumns
	} from '$lib/components/TableForObjectArray.svelte';
	import Card from '$lib/components/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const namespaceColumns: TableColumns = [
		'name',
		'attributes',
		{
			title: 'Actions',
			data: 'name',
			renderHTML: (val) => {
				return `<a href="/namespace/${val}" class="btn btn-primary">Edit</a>`;
			}
		}
	];

	let namespaces = data.namespaces as any; // need this bc data is readonly
</script>

<h1>Admin</h1>

<div class="row">
	<div class="col">
		<Card title="Manage Namespaces">
			<TableForObjectArray data={namespaces} columns={namespaceColumns} />
		</Card>
	</div>
	<div class="col">
		<Card title="Stats">
			<TableForObjectArray data={data.stats} />
		</Card>
	</div>
</div>
