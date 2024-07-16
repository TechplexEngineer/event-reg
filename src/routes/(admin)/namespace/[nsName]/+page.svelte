<script lang="ts">
	import type { PageData } from './$types';
	import FormForNamespace from '../../../../lib/components/FormForNamespace.svelte';
	import Card from '$lib/components/Card.svelte';
	import TableForObjectArray from '$lib/components/TableForObjectArray.svelte';

	export let data: PageData;
	import Pluralize from 'pluralize';
	import indefinite from 'indefinite';
</script>

<div class="row">
	<div class="col">
		<Card title="List of {Pluralize(data.nsName)}">
			<TableForObjectArray data={data.data} columns={Object.keys(data.ns)} />
			<a href="/namespace" class="btn btn-primary">Manage Attributes</a>
		</Card>
	</div>
	<div class="col">
		<Card title="Add {indefinite(data.nsName)}">
			<form method="post" action="?/addData">
				<FormForNamespace nsName={data.nsName} ns={data.ns} />
			</form>
		</Card>
	</div>
</div>
