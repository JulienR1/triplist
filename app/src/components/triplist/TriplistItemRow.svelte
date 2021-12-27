<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IItem } from "@common/models/IItem";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import { SvgSource } from "../svg/SvgSource";
    import SvgIcon from "../SvgIcon.svelte";
    import { itemIsValid, itemsAreEqual } from "common/dist/utils/itemUtils";
    import { Toast } from "src/toast/Toast";
    import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";
    import { api } from "./../../api";

    export let item: IItem;
    export let parentId: string = "";

    const dispatch = createEventDispatcher();

    $: itemDetails = item.values?.map((value, index) => ({
        checked: value,
        id: `${parentId}${item.label}${index}`,
    }));

    const onKeyPress = (event: KeyboardEvent, id: string) => {
        if (event.key === "Enter") {
            toggleCheckbox(id);
        }
    };

    const toggleCheckbox = (id: string) => {
        document.getElementById(id).click();
    };

    const handleItemChange = async () => {
        if (itemIsValid(item)) {
            const updatedItem = await api.updateItem(item);
            if (itemsAreEqual(item, updatedItem)) {
                Toast.info("Modification complétée avec succès.");
            } else {
                if (itemIsValid(updatedItem)) {
                    item = { ...updatedItem };
                }
                Toast.error("Une erreur est survenue au cours de la modification.");
            }
        }
    };

    const handleDelete = async () => {
        await api.deleteItem(item);
        Toast.info("Item supprimé avec succès.");
        dispatch("delete", item);
    };
</script>

<tr>
    <td>
        <DeleteWrapper toRight on:click={handleDelete}>
            <ConfirmedEditableText bind:value={item.label} on:datachange={handleItemChange} />
        </DeleteWrapper>
    </td>
    {#each itemDetails as { checked, id }}
        <td>
            <input type="checkbox" {id} {checked} />
            <label tabindex="0" for={id} on:keypress|preventDefault={(event) => onKeyPress(event, id)}>
                <div>
                    <SvgIcon src={SvgSource.CHECK} size={14} color={"var(--dark-blue)"} />
                </div>
            </label>
        </td>
    {/each}
</tr>

<style lang="scss">
    label {
        --size: 12px;

        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--size);
        height: var(--size);
        line-height: var(--size);
        border: 2px solid var(--dark-grey);
        border-radius: 4px;
        cursor: pointer;

        transition: 0.15s ease;

        div {
            visibility: hidden;
        }

        &:hover,
        &:focus,
        &:focus-within {
            box-shadow: 0 0 4px var(--dark-grey);
        }

        &:focus-visible {
            outline: none;
        }
    }

    input {
        width: 0;
        height: 0;
        opacity: 0;
        visibility: hidden;
        position: absolute;

        &:checked + label {
            border-color: var(--light-blue);
            background-color: var(--light-blue);

            div {
                visibility: visible;
            }

            &:hover,
            &:focus,
            &:focus-within {
                box-shadow: 0 0 4px var(--dark-blue);
            }
        }
    }
</style>
