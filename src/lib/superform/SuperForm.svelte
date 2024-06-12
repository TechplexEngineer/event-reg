<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<T>;

	const { enhance } = form;
</script>

<form method="post" use:enhance>
	<slot></slot>
</form>
