<script lang="ts">
	export let data: Record<string, string>[];
	export let columns: (string | { data: string; title: string })[] = Object.keys(data[0]);
	console.log('data', data);
</script>

<table class="table table-striped">
	<thead>
		<tr>
			{#each columns as obj}
				{#if typeof obj === 'object'}
					<th>{obj.title}</th>
				{:else}
					<th>{obj}</th>
				{/if}
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each columns as colCfg}
					{#if typeof colCfg === 'object'}
						<td>{row[colCfg.data]}</td>
					{:else}
						<td>{row[colCfg]}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
