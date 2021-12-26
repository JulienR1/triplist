<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { api } from "./../../api";
    import { Toast } from "./../../toast/Toast";
    import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import TriplistItemRow from "./TriplistItemRow.svelte";
    import type { ICategory } from "@common/models/ICategory";
    import { categoriesAreEqual, categoryIsValid } from "common/dist/utils/categoryUtils";

    export let category: ICategory;

    const dispatch = createEventDispatcher();

    const handleDataChange = async () => {
        const updatedCategory = await api.updateCategory(category);

        if (categoriesAreEqual(updatedCategory, category)) {
            Toast.info("Modification effectuée avec succès.");
        } else {
            if (categoryIsValid(updatedCategory)) {
                category = { ...updatedCategory };
            }
            Toast.error("Une erreur est survenue au cours de la modification.");
        }
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
