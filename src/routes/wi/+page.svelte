<script lang="ts">
	import TableForObjectArray, {
		type TableColumns
	} from '$lib/components/TableForObjectArray.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const toolTableColumns: TableColumns = [
		{ data: 'name', title: 'Name' },
		{ data: 'quantity', title: 'Quantity' },
		{ data: 'manufacturer', title: 'Manufacturer' },
		{ data: 'status', title: 'Status' }
	];

	const fixturesTableColumns: TableColumns = [
		{ data: 'partNumber', title: 'Part Number' },
		{ data: 'description', title: 'Description' },
		{ data: 'quantity', title: 'Quantity' },
		{ data: 'status', title: 'Status' }
	];

	const partsTableColumns: TableColumns = [
		{ data: 'partNumber', title: 'Part Number' },
		{ data: 'description', title: 'Description' },
		{ data: 'quantity', title: 'Quantity' },
		{ data: 'status', title: 'Status' }
	];

	const stepsTableColumns: TableColumns = [
		{ data: 'stepNumber', title: 'Step' },
		{
			data: 'description',
			title: 'Description',
			renderHTML: (val, type, row) => {
				return `<p>${val}</p>`;
			}
		},
		{
			data: 'images',
			title: 'Image',
			renderHTML: (val, type, row) => {
				return `<img src="${val}">`;
			}
		},
		{
			data: 'actions',
			title: 'Actions',
			renderHTML: () => {
				return `<button class="btn btn-primary">Add Row Before</button><br>
				<button class="btn btn-primary">Add Row After</button>`;
			}
		}
	];
</script>

<h1 title="Work Instruction Name">{data.title}</h1>

<h3>Photo of completed assembly</h3>
<img src={data.image} alt="Completed Assembly" />

<h2>Tools</h2>
<TableForObjectArray data={data.tools} columns={toolTableColumns} />

<h2>Fixtures</h2>
<TableForObjectArray data={data.fixtures} columns={fixturesTableColumns} />

<h2>Parts</h2>
<TableForObjectArray data={data.parts} columns={partsTableColumns} />

<h2>Steps</h2>
<TableForObjectArray data={data.steps} columns={stepsTableColumns} />
