import { Request, Response, NextFunction, Router } from "express";
import { Log } from "../logger";

export class BaseRouterHandler {
	private static instance: BaseRouterHandler | undefined = undefined;

	/**
	 * @param route The endpoint to listen to.
	 */
	private constructor(private router: Router) {
		router.use((request: Request, response: Response, next: NextFunction) => {
			Log(`'${request.method.toUpperCase()} ${request.originalUrl}' has been called.`);
			next();
		});
	}

	/**
	 * @returns The single base router handler in the app.
	 */
	public static Instance(): Router {
		if (this.instance === undefined) {
			this.instance = new BaseRouterHandler(Router());
		}
		return this.instance.router;
	}
}
