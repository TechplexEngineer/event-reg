<script lang="ts">
	import TableForObjectArray, {
		type TableColumns
	} from '$lib/components/TableForObjectArray.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const toolTableColumns: TableColumns = [
		{ data: 'name', title: 'Name' },
		{ data: 'quantity', title: 'Quantity' },
		{ data: 'manufacturer', title: 'Manufacturer' }
	];

	const fixturesTableColumns: TableColumns = [
		{ data: 'partNumber', title: 'Part Number' },
		{ data: 'description', title: 'Description' },
		{ data: 'quantity', title: 'Quantity' }
	];

	const partsTableColumns: TableColumns = [
		{ data: 'partNumber', title: 'Part Number' },
		{ data: 'description', title: 'Description' },
		{ data: 'quantity', title: 'Quantity' }
	];

	const stepsTableColumns: TableColumns = [
		{ data: 'stepNumber', title: 'Step' },
		{ data: 'description', title: 'Description' },
		{ data: 'images', title: 'Image' }
	];
</script>

<h1 title="Work Instruction Name">{data.title}</h1>

<h2>Tools</h2>
<TableForObjectArray data={data.tools} columns={toolTableColumns} />

<h2>Fixtures</h2>
<TableForObjectArray data={data.fixtures} columns={fixturesTableColumns} />

<h2>Parts</h2>
<TableForObjectArray data={data.parts} columns={partsTableColumns} />

<h2>Steps</h2>
<TableForObjectArray data={data.steps} columns={stepsTableColumns} />
