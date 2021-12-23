import type { ToastType } from "./ToastType";

export type ToastId = {};

export interface IToast {
	id: ToastId;
	type: ToastType;
	message: string;
	timeToLive: number;
}
