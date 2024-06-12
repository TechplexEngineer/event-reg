<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let superform: SuperForm<T>;

	const { delayed } = superform;
	export let labelWorking = 'Submitting';
</script>

<button type="submit" class="btn btn-primary" {...$$restProps}>
	{#if $delayed}
		{labelWorking}
		<div class="spinner-border spinner-border-sm text-light" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	{:else}
		<slot />
	{/if}
</button>
