<script lang="ts">
	export let title = '';
</script>

<div class="card">
	<div class="card-body">
		{#if title}
			<h5 class="card-title">{title}</h5>
		{/if}

		<slot></slot>
	</div>
</div>
