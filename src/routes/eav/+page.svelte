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
	<div class="col">
		<Card title="Add Namespace">
			<!-- <FormControl name="type" type="select" items={namespaceTypes} /> -->
			<FormControl name="name" type="text" class="mt-2" />
			<FormControl name="Comment" type="text" class="mt-2" />

			<button type="submit" class="btn btn-primary mt-2">Add</button>
		</Card>
		<Card title="Namespaces" class="mt-2">
			<ul>
				{#each data.namespaces as namespace}
					<li>{namespace.name}</li>
				{/each}
			</ul>
		</Card>
	</div>
	<div class="col"></div>
</div>
