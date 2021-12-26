import { Router } from "express";
import { getTripList } from "../../resources/TripResource";
import { RouterHandler } from "../RouterHandler";

export class RootHandler extends RouterHandler {
    constructor() {
        super("/");
    }

    register(router: Router) {
        router.get(this.route, async (req, res) => {
            const triplist = await getTripList();
            res.json(triplist).status(200);
        });
    }
}
