<script lang="ts">
	/**
	 * The afQuickField component is a helper component that decides whether a particular key should
	 * be rendered using afArrayField, afObjectField, or afFormGroup, and then forwards all your
	 * attributes to the chosen component.
	 *
	 * When you use the afQuickField component for a field that is an Object, it is rendered using
	 * the afObjectField component unless you override the type or supply options.
	 *
	 * When you use the afQuickField component for a field that is an Array, it is rendered using
	 * the afArrayField component unless you override the type or supply options.
	 *
	 * All other keys are rendered using the afFormGroup component.
	 */
    import AfObjectField from './AfObjectField.svelte';
    import AfArrayField from './AfArrayField.svelte';
    import AfFieldInput from './AfFieldInput.svelte';
    import AfFormGroup from './AfFormGroup.svelte';

    const isGroup = false;
    const isFieldArray = false;
    const isHiddenInput = false;
    const groupAtts = {};
</script>

{#if isGroup}
	<AfObjectField />
{:else if isFieldArray}
	<AfArrayField />
{:else if isHiddenInput}
	<!-- if input type is defined as hidden, we don't render a form group -->
	<AfFieldInput {...groupAtts} />
{:else}
	<AfFormGroup {...groupAtts} />
{/if}
