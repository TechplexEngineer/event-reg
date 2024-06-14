<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	import SimpleSchema from 'simpl-schema';
	SimpleSchema.extendOptions(['autoform']);
	import { getContext } from 'svelte';
	import AfFieldInput from './AfFieldInput.svelte';

	export let fieldName: string;
	export let skipLabel = false;
	export let labelClass = '';

	if (fieldName == undefined) {
		//@todo only in dev mode
		throw new Error('fieldName is required');
	}

	const schema = getContext<SimpleSchema>('schema');
	const afOpts = schema.get(fieldName, 'autoform' as any);

	const d = schema.getDefinition(fieldName);
	console.log('d', d);

	const id = 'fg_' + counter++;

	// const s = schema.get(fieldName);
</script>

<div class="form-group">
	<label class="form-label control-label" for={id}>
		{schema.label(fieldName)}
	</label>
	<AfFieldInput {id} {fieldName} />
</div>
<!-- <div
	class={afFormGroupClass}
	data-required={!schema.get(fieldName, 'optional')}
	{...afFormGroupAtts}
>
	{#if !skipLabel}
		<label class={`${labelClass} form-label control-label`}>
			{this.labelText || schema.label(fieldName)}
		</label>
	{/if}
	<AfFieldInput {...bsFieldInputAtts} />
	<!-- {#if afFieldIsInvalid name=this.name}
      <div class="text-danger form-text">{afFieldMessage name=this.name}</div>
    {/if} --
</div> -->
