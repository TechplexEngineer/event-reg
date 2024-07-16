<script lang="ts">
	import QuickForm from '$lib/autoform/QuickForm.svelte';
	import { EventDataSchema } from '$lib/data/events.schema';
	import FormForNamespace from '../../../lib/components/FormForNamespace.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const nsName = 'Event';
</script>

<div class="container">
	<h1>New Event</h1>

	<form action="?/addNsData" method="POST">
		<input type="hidden" name="namespace" value={nsName} />
		<FormForNamespace ns={data.namespace} {nsName} />
	</form>
</div>
