<script lang="ts">
    import type { ICategory } from "@common/models/ICategory";
    import TriplistCategory from "./TriplistCategory.svelte";

    export let categories: ICategory[];
</script>

<tbody>
    {#each categories as { label, items }}
        <TriplistCategory categoryName={label} {items} />
    {/each}
</tbody>

<style lang="scss"></style>
