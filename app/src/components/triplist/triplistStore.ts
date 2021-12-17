import { writable, derived } from "svelte/store";
import type { ITripList } from "./../../../../common/ITripList";

export type ITriplistStore = { apiData: ITripList; error: Error };

export const triplistData = writable<ITriplistStore>({ apiData: undefined, error: undefined });
