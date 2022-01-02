import { RequestMethod } from "./requestMethod";
import type { ITripList } from "@common/models/ITripList";
import type { IActivity } from "@common/models/IActivity";
import type { ICategory } from "@common/models/ICategory";
import type { IItem } from "@common/models/IItem";

const fetchTriplist = (): Promise<ITripList | undefined> => {
    return makeRequest<ITripList>("/");
};

const filterTriplist = (filters: string[]): Promise<ITripList | undefined> => {
    return makeRequest<ITripList>(`/?filters=${filters.join(",")}`);
};

const updateActivity = async (data: IActivity): Promise<IActivity> => {
    return makeRequest<IActivity>("/activity", RequestMethod.POST, { ...data });
};

const createActivity = async (data: IActivity): Promise<IActivity> => {
    return makeRequest<IActivity>("/activity", RequestMethod.PUT, { ...data });
};

const deleteActivity = async (data: IActivity): Promise<void> => {
    return makeRequest<void>("/activity", RequestMethod.DELETE, { ...data });
};

const updateCategory = async (data: IActivity): Promise<ICategory> => {
    return makeRequest<ICategory>("/category", RequestMethod.POST, { ...data });
};

const createCategory = async (data: ICategory): Promise<ICategory> => {
    return makeRequest<ICategory>("/category", RequestMethod.PUT, { ...data });
};

const deleteCategory = async (data: ICategory): Promise<void> => {
    return makeRequest<void>("/category", RequestMethod.DELETE, { ...data });
};

const createItem = async (category: ICategory, itemName: string): Promise<IItem> => {
    return makeRequest<IItem>("/item", RequestMethod.PUT, { category, itemName });
};

const updateItem = async (data: IItem): Promise<IItem> => {
    return makeRequest<IItem>("/item", RequestMethod.POST, { ...data });
};

const checkItem = async (data: IItem): Promise<boolean[]> => {
    return makeRequest<boolean[]>("/item/check", RequestMethod.POST, { ...data });
};

const deleteItem = async (data: IItem): Promise<void> => {
    return makeRequest<void>("/item", RequestMethod.DELETE, { ...data });
};

const makeRequest = async <T>(route: string, method = RequestMethod.GET, body?: string | { [key: string]: unknown }): Promise<T | undefined> => {
    const { env } = process;
    if (!env.SERVER_URL) {
        throw new Error("No endpoint has been set.");
    }

    const headers = body && {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const response = await fetch(`${env.SERVER_URL}${route}`, {
        method,
        headers,
        mode: "cors",
        body: JSON.stringify(body),
    });

    return response.ok ? response.json() : undefined;
};

export { fetchTriplist, filterTriplist, updateActivity, createActivity, deleteActivity, updateCategory, createCategory, deleteCategory, createItem, updateItem, deleteItem, checkItem };
