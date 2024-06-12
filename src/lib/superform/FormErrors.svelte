<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	export let superform: SuperForm<T>;

	const { allErrors, message } = superform;
</script>

{#if $allErrors.length}
	<div class="alert alert-danger" role="alert">
		<strong
			>Error: Unable to submit due to {$allErrors.length > 1
				? 'these errors'
				: 'this error'}:</strong
		>
		<ul class="mb-0">
			{#each $allErrors as error}
				<li>
					<b>{error.path}:</b>
					{error.messages.join('. ')}
				</li>
			{/each}
		</ul>
	</div>
{/if}

{#if $message}
	<div class="alert alert-primary">{$message}</div>
{/if}
