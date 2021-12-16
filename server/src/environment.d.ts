declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "production" | "development";
			APP_URL: string;
			DB_URL: string;
			DB_USER: string;
			DB_PASSWORD: string;
			MAX_DB_CONNECTION_COUNT: string;
		}
	}
}

export {};
