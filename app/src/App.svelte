<script lang="ts">
	import "./styles/style.scss";
	import Triplist from "./components/triplist/Triplist.svelte";
	import ToastContainer from "./toast/ToastContainer.svelte";
</script>

<ToastContainer>
	<main>
		<h1>Triplist</h1>
		<Triplist />
	</main>
</ToastContainer>

<style lang="scss">
	main {
		padding: 2em;
	}
</style>
