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
			<hr />
			<Filterbar />
			<hr />
			<Triplist />
		</main>
	</ToastContainer>
</ModalContainer>

<style lang="scss">
	main {
		padding: 2em;

		h1 {
			text-align: center;
		}

		hr {
			position: relative;
			width: 50vw;
			border: none;
			height: 3vw;
			margin: 0 auto;

			&::after {
				content: "";
				width: 100%;
				height: 1px;
				display: block;
				position: absolute;
				background-color: var(--transparent-background);
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>
