import { writable } from "svelte/store";
import type { IToast } from "./IToast";

export const toastStore = writable<IToast[]>([]);
