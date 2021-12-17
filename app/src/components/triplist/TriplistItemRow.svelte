<script lang="ts">
	import type { Item } from "../../../../common/ITripList";

	export let item: Item;
</script>

<tr>
	<td>{item.name}</td>
	{#each item.values as itemValue}
		<td>{itemValue}</td>
	{/each}
</tr>

<style lang="scss"></style>
