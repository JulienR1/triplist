<script lang="ts">
    import { api } from "../../api";
    import { Toast } from "../../toast/Toast";
    import { createEventDispatcher } from "svelte";
    import type { ICategory } from "@common/models/ICategory";
    import { stringIsValid } from "common/dist/utils/baseValidators";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import TriplistCategory from "./TriplistCategory.svelte";

    const dispatch = createEventDispatcher();

    export let categories: ICategory[];
    export let disabled = false;
    let newCategoryName = "";

    const handleDataChange = async () => {
        const storedCategoryName = newCategoryName;
        newCategoryName = "";

        if (stringIsValid(storedCategoryName)) {
            const receivedCategoryData = await api.createCategory({ id: 0, label: storedCategoryName, items: [] });
            if (storedCategoryName === receivedCategoryData?.label) {
                Toast.info("Catégorie ajoutée avec succès.");
                dispatch("requestupdate", receivedCategoryData);
                return;
            }
        }
        Toast.error("Une erreur est survenue au moment de l'ajout.");
    };
</script>

<tbody>
    {#each categories as category (category.id)}
        <TriplistCategory {category} {disabled} on:requestupdate />
    {/each}
    {#if !disabled}
        <tr>
            <ConfirmedEditableText bind:value={newCategoryName} on:datachange={handleDataChange} placeholder="Nouvelle catégorie" />
        </tr>
    {/if}
</tbody>

<style lang="scss"></style>
