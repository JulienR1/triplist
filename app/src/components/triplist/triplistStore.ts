import type { ITripList } from "@common/models/ITripList";
import { writable } from "svelte/store";

export type ITriplistStore = { apiData: ITripList; error: Error };

export const triplistData = writable<ITriplistStore>({ apiData: undefined, error: undefined });
