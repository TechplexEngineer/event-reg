<script context="module" lang="ts">
	export type tableColumns = (string | { data: string; title: string; render?: renderFn })[];
	export type renderFn = (val: any, type: any, row: any) => string;
</script>

<script lang="ts">
	export let data: Record<string, string>[];
	export let columns: tableColumns = Object.keys(data[0] || { 'No Data': '' });
	const cols2Render = columns.map((k) => {
		if (typeof k === 'string') {
			return {
				data: k,
				title: k.charAt(0).toUpperCase() + k.slice(1)
			};
		}
		return k;
	});
</script>

<table class="table table-striped">
	<thead>
		<tr>
			{#each cols2Render as obj}
				<th>{obj.title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each cols2Render as colCfg}
					{#if colCfg.render}
						<td>{colCfg.render(row[colCfg.data], null, row)}</td>
					{:else}
						<td>{row[colCfg.data]}</td>
					{/if}
				{/each}
			</tr>
		{:else}
			<tr>
				<td colspan={columns.length}>No data to display</td>
			</tr>
		{/each}
	</tbody>
</table>
