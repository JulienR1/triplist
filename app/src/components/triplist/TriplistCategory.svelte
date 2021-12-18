<script lang="ts">
	import type { Item } from "../../../../common/ITripList";
	import TriplistItemRow from "./TriplistItemRow.svelte";

	export let categoryName: string;
	export let items: Item[];
</script>

<tr>{categoryName}</tr>
{#each items as item}
	<TriplistItemRow {item} parentId={categoryName} />
{/each}

<style lang="scss"></style>
