<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { api } from "src/api";
    import { Toast } from "src/toast/Toast";
    import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import TriplistItemRow from "./TriplistItemRow.svelte";
    import type { ICategory } from "@common/models/ICategory";

    export let category: ICategory;

    const dispatch = createEventDispatcher();

    const handleDataChange = () => {
        console.log("new data", category.label);
    };

    const handleDelete = async () => {
        await api.deleteCategory(category);
        Toast.info("Catégorie supprimée.");
        dispatch("requestupdate", category);
    };
</script>

<tr>
    <DeleteWrapper on:click={handleDelete} toRight={true}>
        <ConfirmedEditableText bind:value={category.label} on:datachange={handleDataChange} placeholder="Nom de la catégorie" />
    </DeleteWrapper>
</tr>
{#each category.items as item}
    <TriplistItemRow {item} parentId={category.label} />
{/each}

<style lang="scss"></style>
