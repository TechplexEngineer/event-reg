<script lang="ts">
	import QuickForm from '$lib/autoform/QuickForm.svelte';
	import { EventDataSchema } from '$lib/data/events.schema';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<h1>Edit Event</h1>

	<!-- <QuickForm schema={EventDataSchema} /> -->
</div>
