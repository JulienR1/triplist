import { IActivity } from "@common/models/IActivity";
import { Router, Request, Response } from "express";
import { getActivityById, updateActivity } from "src/resources/ActivityResource";
import { activityIsValid } from "common/dist/utils/activityUtils";
import { RouterHandler } from "./RouterHandler";

export class ActivityHandler extends RouterHandler {
	constructor() {
		super("/activity");
	}

	register(router: Router) {
		router.post(this.route, async ({ body }: Request, res: Response) => {
			const activityBody = body as IActivity;

			if (activityIsValid(activityBody)) {
				await updateActivity(activityBody);
				const activityData = await getActivityById(activityBody.id);
				return res.json(activityData).status(200);
			}
			res.sendStatus(400);
		});
	}
}
