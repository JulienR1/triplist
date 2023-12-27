import { Router, Request, Response } from "express";
import { IActivity } from "@common/models/IActivity";
import {
    addActivity,
    getActivityById,
    removeActivity,
    updateActivity,
} from "../../resources/ActivityResource";
import { stringIsValid, activityIsValid } from "common";
import { RouterHandler } from "../RouterHandler";

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

        router.put(this.route, async ({ body }: Request, res: Response) => {
            const activityBody = body as IActivity;

            if (stringIsValid(activityBody.label)) {
                const savedData = await addActivity(activityBody);
                if (savedData) {
                    return res.json(savedData).status(200);
                }
            }
            res.sendStatus(400);
        });

        router.delete(this.route, async ({ body }: Request, res: Response) => {
            const activityBody = body as IActivity;

            if (activityIsValid(activityBody)) {
                removeActivity(activityBody);
                return res.json({ ok: true }).status(200);
            }
            res.sendStatus(400);
        });
    }
}
