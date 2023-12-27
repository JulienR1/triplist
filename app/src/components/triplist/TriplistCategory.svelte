<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { api } from "./../../api";
    import { Toast } from "./../../toast/Toast";
    import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import TriplistItemRow from "./TriplistItemRow.svelte";
    import type { ICategory } from "@common/models/ICategory";
    import { categoriesAreEqual, categoryIsValid, stringIsValid } from "common";
    import type { IItem } from "@common/models/IItem";
    import { triplistData } from "./triplistStore";

    const dispatch = createEventDispatcher();

    export let category: ICategory;
    export let disabled = false;
    export let activityCount = 0;
    let newItemName: string = "";

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

    const handleNewItem = async () => {
        const storedItemName = newItemName;
        newItemName = "";

        if (stringIsValid(storedItemName)) {
            const newItem = await api.createItem(category, storedItemName);
            if (newItem?.label === storedItemName) {
                Toast.info("Nouvel item ajouté.");
                updateStore(newItem);
                return;
            }
        }
        Toast.error("Impossible d'ajouter un nouvel item.");
    };

    const handleDeleteItem = ({ detail }: CustomEvent<IItem>) => {
        updateStore(detail);
    };

    const updateStore = (item: IItem) => {
        triplistData.update((storedData) => {
            const currentCategory = storedData.apiData.categories.find(
                (c) => c.id === category.id,
            );
            const itemIndex = currentCategory.items.findIndex(
                (storedItem) => storedItem.id === item.id,
            );
            if (itemIndex >= 0) {
                currentCategory.items.splice(itemIndex, 1);
            } else {
                currentCategory.items.push(item);
            }
            return storedData;
        });
    };
</script>

<tr>
    <td>
        <DeleteWrapper on:click={handleDelete} toRight={true} {disabled}>
            <ConfirmedEditableText
                {disabled}
                isHeader
                hideBorder
                bind:value={category.label}
                on:datachange={handleDataChange}
                placeholder="Nom de la catégorie"
            />
        </DeleteWrapper>
    </td>
    <td colspan={activityCount}><hr /></td>
</tr>
{#each category.items as item (item.id)}
    <TriplistItemRow {item} {disabled} on:delete={handleDeleteItem} />
{/each}
{#if !disabled}
    <tr>
        <ConfirmedEditableText
            bind:value={newItemName}
            on:datachange={handleNewItem}
            placeholder="Nouvel item"
        />
    </tr>
{/if}

<style lang="scss"></style>
