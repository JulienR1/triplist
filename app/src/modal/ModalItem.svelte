<script lang="ts">
    import type { IModal } from "./IModal";
    import { createEventDispatcher } from "svelte";
    import SvgIcon from "../components/SvgIcon.svelte";
    import { SvgSource } from "../components/svg/SvgSource";

    export let modal: IModal;

    const dispatch = createEventDispatcher();

    const handleKeypress = ({ code }: KeyboardEvent) => {
        if (code === "Escape") {
            handleCancel();
        } else if (code.includes("Enter")) {
            handleConfirm();
        }
    };

    const handleConfirm = async () => {
        await modal?.confirm.callback();
        close();
    };

    const handleCancel = async () => {
        await modal.cancel.callback();
        close();
    };

    const close = () => {
        dispatch("close");
    };

    const focusOnLoad = (element: HTMLElement) => {
        element.focus();
    };
</script>

<div class="backdrop" on:click|stopPropagation={handleCancel} on:keydown={handleKeypress}>
    <div class="modal" use:focusOnLoad tabindex="0" on:click|stopPropagation={() => {}}>
        <div class="title">
            <SvgIcon src={SvgSource.ERROR} color="var(--light-red)" size={28} />
            <h3>{modal.content.title}</h3>
        </div>
        <div class="body">
            <div class="message">
                <p>{modal.content.message}</p>
            </div>
            <div class="controls">
                {#if modal.confirm}
                    <div class="confirm">
                        <button on:click={handleConfirm}>
                            {modal.confirm.label}
                        </button>
                    </div>
                {/if}
                <div class="cancel">
                    <button on:click={handleCancel}>
                        {modal.cancel.label}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .backdrop {
        width: 100%;
        height: 100%;
        display: block;
        background-color: var(--transparent-background);
        backdrop-filter: blur(1px);
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        padding-top: 2.5vw;
        max-width: 40vw;
        background-color: var(--white);
        transform: translate(-50%, -50%);
        border-radius: 4px;

        .title,
        .body {
            padding: 2.5vw 5vw;
        }
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h3 {
        font-weight: var(--medium);
        font-size: 1.25em;
        color: var(--light-red);
    }

    .body {
        border-top: 1px solid var(--darker-grey-white);
        background-color: var(--grey-white);
    }

    .message {
        font-weight: var(--light);
        font-size: 14px;
        padding-bottom: 2.5vw;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        gap: 2em;

        .confirm,
        .cancel {
            display: block;
            flex: 1;

            button {
                width: 100%;
                font-size: 14px;
                font-weight: var(--semi-bold);
                border-radius: 2px;
                cursor: pointer;
                height: 2.5em;
                text-transform: uppercase;
                opacity: 0.75;
                border: 2px solid var(--darker-grey-white);
                background-color: var(--grey-white);
            }
        }

        .confirm button {
            background-color: var(--light-red);
            color: var(--darker-grey-white);
            border: none;
            opacity: 1;
        }
    }
</style>
