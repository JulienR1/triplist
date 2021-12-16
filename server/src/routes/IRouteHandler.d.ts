import { Application, Router } from "express";

export interface IRouteHandler {
	register(app: Application);
}
