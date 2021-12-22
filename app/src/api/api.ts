import type { ITripList } from "@common/models/ITripList";
import type { IActivity } from "@common/models/IActivity";
import { RequestMethod } from "./requestMethod";

const fetchTriplist = (): Promise<ITripList | undefined> => {
	return makeRequest<ITripList>("/");
};

const updateActivity = async (data: IActivity): Promise<IActivity> => {
	return makeRequest<IActivity>("/activity", RequestMethod.POST, { ...data });
};

const makeRequest = async <T>(
	route: string,
	method = RequestMethod.GET,
	body?: string | { [key: string]: unknown }
): Promise<T | undefined> => {
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

export { fetchTriplist, updateActivity };
