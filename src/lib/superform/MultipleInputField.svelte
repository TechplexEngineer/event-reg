<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import type { FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import { click } from '$lib/superform/onClickKeyPress.action';

	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T>;
	export let showEmptyInput = false;

	const { value, errors, constraints } = formFieldProxy(superform, field);

	if (showEmptyInput) {
		value.update((value) => {
			value.push('');
			return value;
		});
	}

	export let placeholder = '';

	// let inputs: Set<number> = new Set(Array.from(Array($value.length == 0 ? 1 : $value.length).keys()));
	// export let counter = $value.length == 0 ? 1 : $value.length;

	const handleRemove = (index: number) => {
		value.update((value) => {
			value.splice(index, 1);
			return value;
		});
		// formData.update((formData) => {
		//     console.log("formData.documents before", formData.documents)
		//     formData.documents.splice(index, 1);
		//     console.log("formData.documents after", formData.documents)
		//     return formData;
		// });
		// console.log("$formData.documents", $formData, $value)
		// formData.documents[index] = undefined;
		// inputs.delete(index)
		// inputs = inputs;
	};
	const handleAdd = () => {
		value.update((v) => {
			v.push('');
			return v;
		});
		// inputs.add(value);
		// inputs = inputs;
	};
</script>

<div class="d-flex justify-content-between">
	<label class="form-label">
		<slot>No Label</slot>
	</label>
	<div
		class="btn btn-outline-success"
		use:click={() => {
			handleAdd();
		}}
	>
		Add
	</div>
</div>

{#each $value || [] as val, index (index)}
	<div class="input-group mt-2">
		<input
			type="text"
			class="form-control"
			{placeholder}
			bind:value={$value[index]}
			{...$constraints}
		/>

		{#if !$constraints.required || $value?.length !== 1}
			<button
				class="btn btn-outline-danger"
				type="button"
				on:click={() => {
					handleRemove(index);
				}}
			>
				Remove
			</button>
		{/if}
	</div>
	{#if $errors && $errors[index]}
		{#each $errors[index] as error (error)}
			<span class="invalid-feedback d-block">{error}</span>
		{/each}
	{/if}
{/each}

<style>
	label.form-label {
		font-weight: bold;
	}
</style>
