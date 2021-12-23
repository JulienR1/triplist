<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { IToast } from "./IToast";
	import { ToastType } from "./ToastType";
	import { SvgSource } from "./../components/svg/SvgSource";
	import SvgIcon from "./../components/SvgIcon.svelte";

	export let toast: IToast;

	const dispatch = createEventDispatcher();

	const icons: { [key in ToastType]: SvgSource } = {
		[ToastType.INFO]: SvgSource.CHECK,
		[ToastType.ERROR]: SvgSource.ERROR,
	};

	const handleClick = () => {
		dispatch("remove");
	};
</script>

<div class={["toast", toast.type].join(" ")} style={`--ttl: ${toast.timeToLive}ms;`} on:click={handleClick}>
	<div class="content">
		<SvgIcon src={icons[toast.type]} />
		<p>{toast.message}</p>
	</div>
	<span class="close">
		<SvgIcon src={SvgSource.CANCEL} size={14} />
	</span>
</div>

<style lang="scss">
	.toast {
		display: flex;
		position: relative;
		box-shadow: 0 0 6px -1px var(--dark-grey);
		background-color: var(--white);
		border-radius: 4px;
		padding: 6px 12px;
		font-size: 13px;
		margin: 0 auto;
		width: 30vw;
		justify-content: space-between;
		overflow: hidden;
		cursor: pointer;

		&::after {
			content: "";
			position: absolute;
			max-width: 100%;
			width: 100%;
			height: 3px;
			bottom: 0;
			left: 0;
			animation: progressbar linear var(--ttl) forwards;
		}

		@keyframes progressbar {
			0% {
				max-width: 100%;
			}
			100% {
				max-width: 0%;
			}
		}
	}

	.content {
		display: flex;
	}

	p {
		margin: 0 4px;
	}

	.info::after {
		background-color: var(--light-green);
	}

	.error::after {
		background-color: var(--light-red);
	}

	.close {
		justify-content: flex-end;
		transition: all 0.15s ease;

		&:hover {
			transform: scale(1.125);
		}
	}
</style>
