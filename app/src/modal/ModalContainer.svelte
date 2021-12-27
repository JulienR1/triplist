<script lang="ts">
    import ModalItem from "./ModalItem.svelte";
    import { modalStore } from "./ModalStore";

    const handleModalClose = () => {
        modalStore.update((storedModals) => {
            storedModals.pop();
            return storedModals;
        });
    };
</script>

<slot />
<div class={["modals", $modalStore.length === 0 ? "invisible" : ""].join(" ")}>
    {#each $modalStore as modal (modal.id)}
        <ModalItem {modal} on:close={handleModalClose} />
    {/each}
</div>

<style lang="scss">
    .modals {
        position: fixed;
        width: 100vw;
        height: 100vh;
        margin: 0;
        top: 0;

        &.invisible {
            pointer-events: none;
        }
    }
</style>
