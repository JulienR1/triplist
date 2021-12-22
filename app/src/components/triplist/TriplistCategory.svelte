<script lang="ts">
	import type { Item } from "@common/models/ITripList";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
	import TriplistItemRow from "./TriplistItemRow.svelte";

	export let categoryName: string;
	export let items: Item[];

	const handleDataChange = () => {
		console.log("new data", categoryName);
	};
</script>

<tr>
	<ConfirmedEditableText bind:value={categoryName} on:datachange={handleDataChange} placeholder="Nom de la catégorie" />
</tr>
{#each items as item}
	<TriplistItemRow {item} parentId={categoryName} />
{/each}

<style lang="scss"></style>
