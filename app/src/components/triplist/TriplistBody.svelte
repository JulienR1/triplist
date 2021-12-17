<script lang="ts">
	import type { Category } from "../../../../common/ITripList";
	import TriplistCategory from "./TriplistCategory.svelte";

	export let categories: Category;
</script>

<tbody>
	{#each Object.keys(categories) as categoryName}
		<TriplistCategory {categoryName} items={categories[categoryName]} />
	{/each}
</tbody>

<style lang="scss"></style>
