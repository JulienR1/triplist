import { Request, Response, Router } from "express";
import { getTripList } from "../../resources/TripResource";
import { RouterHandler } from "../RouterHandler";

export class RootHandler extends RouterHandler {
    constructor() {
        super("/");
    }

    register(router: Router) {
        router.get(this.route, async ({ query }: Request, res: Response) => {
            const filtersStr = (query.filters || "") as string;
            const filters = filtersStr.split(",").filter((value) => value !== "");

            const triplist = await getTripList(filters);
            res.json(triplist).status(200);
        });
    }
}
