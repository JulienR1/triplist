import { Router } from "express";
import { BaseRouterHandler } from "./BaseRouterHandler";
import { IRouterHandler } from "./IRouterHandler";

export abstract class RouterHandler implements IRouterHandler {
	constructor(protected route: string) {
		this.register(BaseRouterHandler.Instance());
	}

	/**
	 * An available method to specify the routes in a specific file.
	 */
	abstract register(router: Router): void;

	/**
	 * @returns The specific endpoint (string) to which the router is listening to.
	 */
	private getRoute(): string {
		if (!this.route) {
			throw new Error("No endpoint has been specified for the specified route handler.");
		}
		return this.route;
	}
}
