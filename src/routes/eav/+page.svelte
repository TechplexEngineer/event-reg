<script lang="ts">
	import type { PageData } from './$types';
	import Card from './Card.svelte';
	import FormControl from './FormControl.svelte';
	import Select from 'svelte-select';

	export let data: PageData;
	export const namespaceTypes = [
		{ value: 'entity', label: 'Entity' },
		{ value: 'enumeration', label: 'Enumeration' }
	];
</script>

<h1>EAV Schema Creator</h1>

<div class="row">
	<div class="col"></div>
	<div class="col">
		<Card title="Add Namespace">
			<FormControl name="type" type="select" items={namespaceTypes} />
			<FormControl name="name" type="text" />

			<a href="#" class="btn btn-primary">Add</a>
		</Card>
	</div>
</div>
