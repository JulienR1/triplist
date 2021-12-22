import express, { json } from "express";
import cors, { CorsOptions } from "cors";
import { BaseRouterHandler } from "src/routes/BaseRouterHandler";

export class Server {
	private corsOptions: CorsOptions = {
		origin: process.env.APP_URL,
		optionsSuccessStatus: 200,
	};

	constructor(port: number | string) {
		const app = express();
		app.use(cors(this.corsOptions));
		app.use(json());
		app.use(BaseRouterHandler.Instance());
		app.listen(port, () => console.log(`Listening on port ${port}`));
	}
}
