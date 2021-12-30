import type { ITripList } from "@common/models/ITripList";
import { writable } from "svelte/store";
import { api } from "../../api";

export type ITriplistStore = { apiData: ITripList; filteredData?: ITripList; error: Error };

export const triplistData = writable<ITriplistStore>({ apiData: undefined, error: undefined });

export const callTriplistApi = async () => {
    let apiStoreData: ITriplistStore = { apiData: undefined, error: undefined };
    try {
        apiStoreData.apiData = await api.fetchTriplist();
    } catch (err) {
        apiStoreData.error = err;
    } finally {
        triplistData.set(apiStoreData);
    }
};

export const callFilterTriplistApi = async (filters: string[]) => {
    const filteredTriplistData = filters.length > 0 ? await api.filterTriplist(filters) : undefined;
    triplistData.update((currentData) => {
        currentData.filteredData = filteredTriplistData;
        return currentData;
    });
};
