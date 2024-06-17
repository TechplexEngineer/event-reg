<script lang="ts">
	import FormControl from '../FormControl.svelte';
	import { mapNamespaceTypeToInputType, type Namespace } from '../eav';

	export let ns: Namespace;
	export let nsName: string;
</script>

<input type="hidden" name="namespace" value={nsName} />

{#each Object.entries(ns) as [nsName, nsAttrs] (nsName)}
	<FormControl name={nsName} type={mapNamespaceTypeToInputType(nsAttrs.type)} />
{/each}
<button type="submit" class="mt-2 btn btn-primary">Add</button>
