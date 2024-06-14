<script lang="ts">
	export let title = '';
	let className = '';
	export { className as class };
</script>

<div class={`card ${className}`}>
	<div class="card-body">
		{#if title}
			<h5 class="card-title">{title}</h5>
		{/if}

		<slot></slot>
	</div>
</div>
