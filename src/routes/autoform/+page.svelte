<script lang="ts">
	import AfFieldInput from '$lib/autoform/AfFieldInput.svelte';
	import AfFormGroup from '$lib/autoform/AfFormGroup.svelte';
	import AutoForm from '$lib/autoform/AutoForm.svelte';
	import SimpleSchema from 'simpl-schema';
	SimpleSchema.extendOptions(['autoform']);

	const schema = new SimpleSchema({
		name: { type: String },
		address: {
			type: String,
			autoform: {
				type: 'textarea',
				rows: 5
			}
		}
	});
</script>

<!-- <script lang="ts"></script> -->

<h1>Page</h1>

<!-- <AfFieldInput /> -->
<AutoForm {schema}>
	<!-- <AfFieldInput name="name" /> -->
	<AfFormGroup fieldName="name" />
	<AfFormGroup fieldName="address" />
	<button class="btn btn-primary" type="submit">Submit</button>
</AutoForm>
