import express from "express";
import cors, { CorsOptions } from "cors";
import { IRouteHandler } from "../routes/IRouteHandler";

export class Server {
	private corsOptions: CorsOptions = {
		origin: process.env.APP_URL,
		optionsSuccessStatus: 200,
	};

	constructor(port: number | string, handlers: IRouteHandler[]) {
		const app = express();
		app.use(cors(this.corsOptions));

		handlers.forEach((handler) => {
			handler.register(app);
		});

		app.listen(port, () => console.log(`Listening on port ${port}`));
	}
}
