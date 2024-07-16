<script lang="ts">
	import FormControl from './FormControl.svelte';
	import { mapNamespaceTypeToInputType, type Namespace } from '../data/eav';

	export let ns: Namespace;
	export let nsName: string;
</script>

<input type="hidden" name="namespace" value={nsName} />

{#each Object.entries(ns) as [attrName, nsAttrs] (attrName)}
	<FormControl name={attrName} type={mapNamespaceTypeToInputType(nsAttrs.type)} />
{/each}
<button type="submit" class="mt-2 btn btn-primary">Add</button>
