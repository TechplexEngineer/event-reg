<script context="module" lang="ts">
	export type tableColumns = (string | { data: string; title: string; render?: renderFn })[];
	export type renderFn = (val: any, type: any, row: any) => string;
</script>

<script lang="ts">
	export let data: Record<string, string>[];
	export let columns: tableColumns = Object.keys(data[0]);
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
						{#if colCfg.render}
							<td>{colCfg.render(row[colCfg.data], null, row)}</td>
						{:else}
							<td>{row[colCfg.data]}</td>
						{/if}
					{:else}
						<td>{row[colCfg]}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
