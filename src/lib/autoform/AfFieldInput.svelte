<script lang="ts">
	export let klass = {};
	export let value = '';
</script>

<input type="text" bind:value class={`${klass} form-control`} {...$$restProps} />
