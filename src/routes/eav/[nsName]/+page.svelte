<script lang="ts">
	import TableForObjectArray from '$lib/TableForObjectArray.svelte';
	import Card from '../Card.svelte';
	import FormControl from '../FormControl.svelte';
	import type { PageData } from './$types';
	import FormForNamespace from './FormForNamespace.svelte';

	export let data: PageData;

	console.log(data.data);
</script>

<div class="row">
	<div class="col">
		<Card title="List of {data.nsName}">
			<TableForObjectArray data={data.data} columns={Object.keys(data.ns)} />
		</Card>
	</div>
	<div class="col">
		<Card title="Add a/an {data.nsName}">
			<form method="post" action="?/addData">
				<FormForNamespace nsName={data.nsName} ns={data.ns} />
			</form>
		</Card>
	</div>
</div>
