import type { ITripList } from "../../../common/ITripList";
import { RequestMethod } from "./requestMethod";

const fetchAll = (): Promise<ITripList | undefined> => {
	return makeRequest<ITripList>("/");
};

const makeRequest = async <T>(route: string, method = RequestMethod.GET, body?: string): Promise<T | undefined> => {
	const { env } = process;
	if (!env.SERVER_URL) {
		throw new Error("No endpoint has been set.");
	}

	const response = await fetch(`${env.SERVER_URL}${route}`, { method, mode: "cors", body });
	return response.ok ? response.json() : undefined;
};

export { fetchAll };
