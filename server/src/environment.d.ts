declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "production" | "development";
			APP_URL: string;
		}
	}
}

export {};
