<script lang="ts">
	import { enhance } from '$app/forms';
	import TableForObjectArray from '$lib/TableForObjectArray.svelte';
	import { click } from '$lib/superform/onClickKeyPress.action';
	import type { PageData } from './$types';
	import Card from './Card.svelte';
	import FormControl from './FormControl.svelte';
	import Select from 'svelte-select';
	import { cardinalityOptions, typeOptions } from './eav';

	export let data: PageData;
	export const namespaceTypes = [
		{ value: 'entity', label: 'Entity' },
		{ value: 'enumeration', label: 'Enumeration' }
	];

	let selectedNsName: string | null = null;
</script>

<h1>EAV Schema Creator</h1>

<div class="row">
	<div class="col">
		<Card title="Add Namespace">
			<form method="post" use:enhance action="?/addNamespace">
				<!-- <FormControl name="type" type="select" items={namespaceTypes} /> -->
				<FormControl name="name" type="text" class="mt-2" />
				<!-- <FormControl name="Comment" type="text" class="mt-2" /> -->

				<button type="submit" class="btn btn-primary mt-2">Add</button>
			</form>
		</Card>
		<Card title="Namespaces" class="mt-2">
			<ul>
				{#each Object.entries(data.namespaces) as [nsName, nsAttrs] (nsName)}
					<li
						class={'clickable ' + (selectedNsName == nsName ? 'active' : '')}
						use:click={() => {
							if (selectedNsName == nsName) {
								selectedNsName = null;
							} else {
								selectedNsName = nsName;
							}
						}}
					>
						{nsName}
					</li>
				{/each}
			</ul>
		</Card>
	</div>
	<div class="col">
		<Card title={`Attributes of Namespace: ${selectedNsName || 'None Selected'}`} class="mt-2">
			{#if selectedNsName}
				<TableForObjectArray
					data={Object.entries(data.namespaces[selectedNsName]).map(([attrName, attrProps]) => ({
						name: attrName,
						...attrProps
					}))}
				/>
				<!--
			{#each Object.entries(data.namespaces[selectedNsName] || {}) as [attrName, attr] (attrName)}
				<div>{attrName} - {JSON.stringify(attr)}</div>
			{/each} -->
				<a href="eav/{selectedNsName}" class="btn btn-primary">Add Data</a>
			{/if}
		</Card>
		{#if selectedNsName}
			<Card title={`Add Attributes to: ${selectedNsName || 'None Selected'}`} class="mt-2">
				<form method="post" use:enhance action="?/addAttribute">
					<input type="hidden" name="namespace" value={selectedNsName} />
					<FormControl name="name" type="text" required class="mt-2" />
					<FormControl name="comment" type="text" class="mt-2" />
					<FormControl
						name="cardinality"
						type="select"
						items={cardinalityOptions}
						required
						class="mt-2"
					/>
					<FormControl name="type" type="select" required items={typeOptions} class="mt-2" />
					<!-- <FormControl name="unique" type="text" class="mt-2" /> -->
					<!-- <FormControl name="component" type="text" class="mt-2" /> -->
					<!-- <FormControl name="history" type="text" class="mt-2" /> -->
					<!-- <FormControl name="deprecated" type="text" class="mt-2" /> -->

					<button type="submit" class="btn btn-primary mt-2">Add</button>
				</form>
			</Card>
		{/if}
	</div>
</div>

<style>
	.clickable {
		cursor: pointer;
		padding: 5px 8px;
	}
	.active {
		font-style: italic;
		text-decoration: underline;
		background-color: #ccc;
	}
</style>
