<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import Select from 'svelte-select';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { FormPathLeaves } from 'sveltekit-superforms';

	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T>;

	const { value, errors, constraints } = formFieldProxy(superform, field);

	// $: console.log("constraints", $constraints)
	// $: console.log("errors", $errors)

	//@todo can't determine required based on constraints
</script>

<Select {...$$restProps} bind:value={$value} />
{#if $errors}<span class="invalid-feedback d-block">{$errors}</span>{/if}
