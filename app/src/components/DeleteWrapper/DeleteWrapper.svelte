<script lang="ts">
    import { Modal } from "../../modal/Modal";
    import { createEventDispatcher } from "svelte";
    import { SvgSource } from "../svg/SvgSource";
    import SvgIcon from "../SvgIcon.svelte";

    const dispatch = createEventDispatcher();

    export let toRight = false;

    const handleClick = (event: Event) => {
        new Promise<void>((resolve, reject) => {
            Modal.confirm(
                {
                    title: "Confirmer la suppression",
                    message: "Attention, la suppression est permanente.",
                },
                { label: "Annuler", callback: () => reject() },
                { label: "Supprimer", callback: () => resolve() }
            );
        })
            .then(() => {
                dispatch(event.type, event);
            })
            .catch(() => {});
    };
</script>

<div class="delete-wrapper">
    <slot />
    <button on:click={handleClick} class:toRight>
        <SvgIcon src={SvgSource.DELETE} color={"var(--dark-red)"} size={18} />
    </button>
</div>

<style lang="scss">
    .delete-wrapper {
        display: block;
        position: relative;
        width: fit-content;
        height: fit-content;
    }

    button {
        display: block;
        position: absolute;
        left: 50%;
        top: 100%;
        border: none;
        outline: none;
        padding: 2px;
        transform: translateX(-50%) translateY(-4px);
        z-index: 1;
        background-color: var(--light-red);
        border-radius: 4px;
        visibility: hidden;
        opacity: 0;
        transition: all 0.15s ease;
        cursor: pointer;

        &.toRight {
            left: 100%;
            top: 50%;
            transform: translateX(-4px) translateY(-50%);
        }
    }

    .delete-wrapper {
        &:hover,
        &:focus,
        &:focus-within {
            & button {
                visibility: visible;
                opacity: 1;
                transform: translateX(-50%) translateY(0);

                &.toRight {
                    transform: translateX(0) translateY(-50%);
                }

                &:hover,
                &:focus,
                &:focus-within {
                    box-shadow: 0 0 6px -1px var(--dark-red);
                }
            }
        }
    }
</style>
