<script lang="ts">
	import { enhance } from '$app/forms';
	import type SimpleSchema from 'simpl-schema';
	import { getContext, setContext } from 'svelte';

	export let schema: SimpleSchema;

	const ctx = getContext('schema');
	if (ctx !== undefined) {
		throw new Error('An AutoForm cannot be nested inside another AutoForm.');
	}

	setContext('schema', schema);
</script>

<form use:enhance method="POST">
	<slot></slot>
</form>
