import { Request, Response, NextFunction, Router, Application } from "express";
import { Log } from "../logger";
import { IRouteHandler } from "./IRouteHandler";

export abstract class BaseRouterHandler implements IRouteHandler {
	/**
	 * @param route The endpoint to listen to.
	 */
	constructor(protected route: string) {}

	/**
	 * Adds the route data to the application
	 * @param app Base application to which the routes need to be added.
	 */
	public register(app: Application) {
		app.use(this.getRoute(), this.getRouteLogic());
	}

	/**
	 * @returns The specific endpoint (string) to which the router is listening to.
	 */
	private getRoute(): string {
		if (!this.route) {
			throw new Error("No endpoint has been specified for the specified route handler.");
		}
		return this.route;
	}

	/**
	 * Implements the details corresponding to the route through REST verbs.
	 */
	protected abstract getRouteLogic(): Router;

	/**
	 * @returns The base object containing the routing information to be detailed by children classes.
	 */
	protected getRouter(): Router {
		const router = Router();
		router.use((request: Request, response: Response, next: NextFunction) => {
			Log(`'${this.getRoute()}' has been called.`);
			next();
		});
		return router;
	}
}
