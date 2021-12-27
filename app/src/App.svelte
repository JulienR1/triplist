<script lang="ts">
    import "./styles/style.scss";
    import Triplist from "./components/triplist/Triplist.svelte";
    import ToastContainer from "./toast/ToastContainer.svelte";
    import ModalContainer from "./modal/ModalContainer.svelte";
</script>

<ModalContainer>
    <ToastContainer>
        <main>
            <h1>Triplist</h1>
            <Triplist />
        </main>
    </ToastContainer>
</ModalContainer>

<style lang="scss">
    main {
        padding: 2em;
    }
</style>
