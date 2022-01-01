<script lang="ts">
    import "./styles/style.scss";
    import Filterbar from "./components/filterbar/Filterbar.svelte";
    import Triplist from "./components/triplist/Triplist.svelte";
    import ToastContainer from "./toast/ToastContainer.svelte";
    import ModalContainer from "./modal/ModalContainer.svelte";
</script>

<ModalContainer>
    <ToastContainer>
        <main>
            <h1>Triplist</h1>
            <Filterbar />
            <Triplist />
        </main>
    </ToastContainer>
</ModalContainer>

<style lang="scss">
    main {
        padding: 2em;
    }
</style>
