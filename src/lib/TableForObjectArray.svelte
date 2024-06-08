<script lang="ts">
	export let data: Record<string, string>[];
	export let columns: string[] = Object.keys(data[0]);
	console.log('data', data);
</script>

<table class="table table-striped">
	<thead>
		<tr>
			{#each columns as key}
				<th>{key}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each Object.values(row) as value}
					<td>{value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
