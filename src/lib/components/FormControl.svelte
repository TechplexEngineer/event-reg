<script context="module" lang="ts">
	let counter = 0;
	export type HTMLInputType =
		// | 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		// | 'radio'
		| 'range'
		// | 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'select'
		| string; // allow other element types that we haven't explicitly added

	export type Items = Readonly<({ value: string; label: string } | string)[]>;
</script>

<script lang="ts">
	import Select from 'svelte-select';

	export let name: string;
	export let label = name.charAt(0).toUpperCase() + name.slice(1);
	export let classes: {
		fg?: string[];
		label?: string[];
		input?: string[];
	} = {};
	export let type: HTMLInputType = 'text';
	export let items: Items = [];

	export let required: boolean = false;

	let className = '';
	export { className as class };

	const id = 'fg_' + counter++;
</script>

<div class={[...(classes.fg ?? [])].join(' ')}>
	<label for={id} class={`form-label ${classes.label ? classes.label?.join(' ') : ''}`}
		>{label}</label
	>
	{#if type === 'select'}
		<Select
			{name}
			{id}
			{items}
			{required}
			class={`${classes.input ? classes.input?.join(' ') : ''}`}
		/>
	{:else}
		<input
			{type}
			{name}
			class={`form-control ${classes.input ? classes.input?.join(' ') : ''}`}
			{required}
			{id}
		/>
	{/if}
</div>
