<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T>;

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<label class="form-label fw-bold">
	<slot>
		{field}
	</slot>
</label>
<input
	name={field}
	class="form-control"
	type="text"
	aria-invalid={$errors ? 'true' : undefined}
	bind:value={$value}
	{...$constraints}
	{...$$restProps}
/>

{#if $errors}<span class="invalid-feedback d-block">{$errors}</span>{/if}

<style lang="scss">
	input[aria-invalid='true'] {
		//background-color: #f8d7da;
		border-color: red;
	}
</style>
