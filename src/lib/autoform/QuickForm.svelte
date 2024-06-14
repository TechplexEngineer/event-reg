<script lang="ts">
	import SimpleSchema from 'simpl-schema';
	import AfQuickFields from './AfQuickFields.svelte';

	// export let schema: SimpleSchema;

	const schema = new SimpleSchema({
		name: { type: String }
	});

	const grouplessFields = [];
	const fieldGroups: { fields: []; label: string }[] = [];
	const qfShouldRenderButton = true;
</script>

<h1>QuickForm</h1>

<!-- <afQuickFields fields={grouplessFields}></afQuickFields> -->

{#each fieldGroups as fieldGroup}
	<fieldset class="af-fieldGroup">
		<legend class="af-fieldGroup-heading">{fieldGroup.label}</legend>
		<AfQuickFields fields={fieldGroup.fields} />
	</fieldset>
{/each}
