declare global {
	namespace NodeJS {
		interface ProcessEnv {
			isProd: boolean;
			SERVER_URL: string;
		}
	}
}

export {};
