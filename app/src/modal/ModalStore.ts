import { writable } from "svelte/store";
import type { IModal } from "./IModal";

export const modalStore = writable<IModal[]>([]);
