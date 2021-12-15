import { RequestMethod } from "./requestMethod";

// TODO: specify return type
const fetchAll = (): Promise<unknown | undefined> => {
	return makeRequest("/");
};

const makeRequest = async (route: string, method = RequestMethod.GET, body?: string): Promise<unknown | undefined> => {
	const { env } = process;
	if (!env.SERVER_URL) {
		throw new Error("No endpoint has been set.");
	}

	const response = await fetch(`${env.SERVER_URL}${route}`, { method, mode: "cors", body });
	return response.ok ? response.json() : undefined;
};

export { fetchAll };
