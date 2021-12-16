import { Router } from "express";
import { getTripList } from "../resources/TripResource";
import { BaseRouterHandler } from "./BaseRouterHandler";

export class RootHandler extends BaseRouterHandler {
	constructor() {
		super("/");
	}

	public getRouteLogic(): Router {
		const router = this.getRouter();

		router.get(this.route, (req, res) => {
		});

		return router;
	}
}
