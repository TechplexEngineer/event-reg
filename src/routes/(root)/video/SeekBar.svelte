<script lang="ts">

	import { formatControl } from "./format";
    import FF from '$lib/components/FF.svelte';
	import RW from '$lib/components/RW.svelte';

    export let fileName: string;

    const controls: number[] = [
		-5 * 60,
		-2 * 60,
		-1 * 60,
		-20,
		-10,
		-5,
		5,
		10,
		20,
		1 * 60,
		2 * 60,
		5 * 60
	];

    export let seek: (time: number)=>void;

</script>


<div class="d-flex justify-content-between mt-4">
    <div class="btn-group" role="group">
        {#each controls.filter((c) => c < 0) as control}
            <button type="button" class="btn btn-outline-secondary" on:click={() => seek(control)}
                ><RW /> {formatControl(control)}</button
            >
        {/each}
    </div>
    <h3>{fileName}</h3>
    <div class="btn-group" role="group">
        {#each controls.filter((c) => c > 0) as control}
            <button type="button" class="btn btn-outline-secondary" on:click={() => seek(control)}
                >{formatControl(control)} <FF /></button
            >
        {/each}
    </div>
</div>