import type { IToast } from "./IToast";
import { toastStore } from "./ToastStore";
import { ToastType } from "./ToastType";
import { TOAST_DEFAULT_TIME } from "common/dist/constants";

export class Toast {
	static info(message: string, timeToLive = TOAST_DEFAULT_TIME): void {
		this.addToast({ id: {}, type: ToastType.INFO, message, timeToLive });
	}

	static error(message: string, timeToLive = TOAST_DEFAULT_TIME): void {
		this.addToast({ id: {}, type: ToastType.ERROR, message, timeToLive });
	}

	private static addToast(toast: IToast) {
		toastStore.update((toasts) => [...toasts, toast]);
	}
}
