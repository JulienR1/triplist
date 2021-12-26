<script lang="ts">
    import { SvgSource } from "../svg/SvgSource";
    import SvgIcon from "../SvgIcon.svelte";

    export let toRight = false;
</script>

<div class="delete-wrapper">
    <slot />
    <button on:click class:toRight>
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
