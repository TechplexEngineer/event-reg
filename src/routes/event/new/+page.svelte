<script lang="ts">
	import { eventInsertSchema } from '$lib/data/events.schema';
	import FormErrors from '$lib/superform/FormErrors.svelte';
	import Submit from '$lib/superform/Submit.svelte';
	import SuperForm from '$lib/superform/SuperForm.svelte';
	import TextField from '$lib/superform/TextField.svelte';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { zod } from 'sveltekit-superforms/adapters';
	import { zodToJsonSchema as zodToJson } from 'zod-to-json-schema';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { z } from 'zod';

	export let data: PageData;

	const superform = superForm(data.form, {
		validators: zod(eventInsertSchema),
		validationMethod: 'onblur', //onblur only works if use:enhance is setup
		// defaultValidator: "keep"
		flashMessage: {
			module: flashModule
		}
	});

	console.log('schema', zodToJson(eventInsertSchema));

	const recurseShape = (shape) => {
		console.log('shape', shape);

		for (const name in shape) {
			const def = shape[name] as z.ZodType;
			if (def instanceof z.ZodString) {
				const min = def._def.checks.find((ch) => ch.kind === 'min');
				const max = def._def.checks.find((ch) => ch.kind === 'max');
			} else if (def instanceof z.ZodEnum) {
				const map = def.enum;
			} else if (def instanceof z.ZodObject) {
				console.log('obj', name);
				recurseShape(def.shape);
			} else if (def instanceof z.ZodOptional) {
				console.log('opt', name);
				// console.log(def.unwrap());
				recurseShape(def.unwrap().shape);
			} else if (def instanceof z.ZodLazy) {
				console.log('lazy', name);
				recurseShape(def.schema);
			} else {
				console.log('else', name);
			}
		}
	};

	// recurseShape(eventInsertSchema.shape);

	// Snapshots preserve user input on reload and navigation
	const { capture, restore, enhance, message, errors, allErrors, delayed } = superform;
	export const snapshot = { capture, restore };

	// for the SuperDebug component
	const f = superform.form;
</script>

<div class="container">
	<h1>Edit Event</h1>

	<FormErrors {superform} />

	<SuperForm form={superform}>
		<div class="row">
			<div class="col">
				<TextField {superform} field="name"></TextField>
			</div>
			<!-- <div class="col">
				<TextField {superform} field="email"></TextField>
			</div> -->
		</div>

		<Submit {superform} class="btn btn-primary mt-2">Submit</Submit>
	</SuperForm>

	<div class="mt-3">
		<SuperDebug data={$f} />
	</div>
</div>
