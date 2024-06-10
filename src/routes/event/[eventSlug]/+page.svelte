<script lang="ts">
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';
	import TableForObjectArray, { type tableColumns } from '$lib/TableForObjectArray.svelte';

	const columns: tableColumns = [
		{
			data: 'name',
			title: 'Name'
		},
		{
			data: 'number',
			title: 'Number',
			render: (val, _, row) => {
				return `${row.type} ${val}`; //JSON.stringify(row);
			}
		},
		{
			data: 'location',
			title: 'Location'
		},
		{
			data: 'status',
			title: 'Status',
			render: (val) => {
				if (val == undefined) {
					return 'Registered';
				}
				return val;
			}
		}
	];

	// @todo protect against undefined by redirecting if there is an invalid slug
	const event = $page.data.event.name;
	const slug = $page.params.eventSlug;
</script>

<div class="d-flex">
	<h1>{event}</h1>
</div>
<div class="d-flex">
	<div class="ms-auto">
		<a href="/event/{slug}/edit" class="btn btn-warning">Edit Event</a>
		<a href="/event/{slug}/contact" class="btn btn-outline-primary">Contact Organizers</a>
		<a href="/my/{slug}" class="btn btn-primary">Manage Registration</a>
		<a href="/event/{slug}/volunteer" class="btn btn-outline-success">Volunteer</a>
	</div>
</div>

<span id="date" class="ms-2 fst-italic text-muted">Date: {$page.data.event.dateStr}</span>
<span id="location" class="ms-2 fst-italic text-muted">Location: {$page.data.event.location}</span>
<!-- <span id="poc" class="ms-2 fst-italic text-muted">Contact: {$page.data.event.contactEmail}</span> -->
<span id="eventWeb" class="ms-2 fst-italic text-muted"
	>Event Website: <a target="_blank" href={$page.data.event.eventWebsite}
		>{$page.data.event.eventWebsite}</a
	></span
>

{#if $page.data.event.message}
	<h3 class="mt-3">Message</h3>
	<SvelteMarkdown source={$page.data.event.message} />
{/if}
<div class="d-flex">
	<h3 class="mt-3">Teams</h3>
	<span class="ms-auto" title="Event is capped at {$page.data.event.teamLimit} teams"
		>{$page.data.teams.length} of {$page.data.event.teamLimit} teams</span
	>
</div>

<TableForObjectArray data={$page.data.teams} {columns} />
