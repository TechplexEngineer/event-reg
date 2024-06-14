<script lang="ts">
	/**
	 * Render an afQuickField for each field in the form schema or an object field.
	 */
	import AfQuickField from './AfQuickField.svelte';
	export let fields: string[] = [];

	const getAttrsForField = (fieldName: string): Record<string, string> => {
		return {};
	};
</script>

{#each fields as fieldName}
	<AfQuickField {...getAttrsForField(fieldName)} />
{/each}
