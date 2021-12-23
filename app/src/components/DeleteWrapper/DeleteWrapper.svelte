<script lang="ts">
	import { SvgSource } from "../svg/SvgSource";
	import SvgIcon from "../SvgIcon.svelte";
</script>

<div class="delete-wrapper">
	<slot />
	<button on:click>
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
	}

	.delete-wrapper {
		&:hover,
		&:focus,
		&:focus-within {
			& button {
				visibility: visible;
				opacity: 1;
				transform: translateX(-50%) translateY(0);

				&:hover,
				&:focus,
				&:focus-within {
					box-shadow: 0 0 6px -1px var(--dark-red);
				}
			}
		}
	}
</style>
