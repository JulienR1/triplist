import { Router } from "express";

export interface IRouterHandler {
	register(router: Router): void;
}
