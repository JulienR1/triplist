import { ICategory } from "@common/models/ICategory";
import { Router, Request, Response } from "express";
import { RouterHandler } from "../RouterHandler";
import { categoryIsValid } from "common/dist/utils/categoryUtils";
import { Log } from "src/logger";
import { addCategory } from "src/resources/CategoryResource";

export class CategoryHandler extends RouterHandler {
    constructor() {
        super("/category");
    }

    register(router: Router) {
        router.get(this.route, (req: Request, res: Response) => {
            Log("TODO");
            res.sendStatus(400);
        });

        router.put(this.route, async ({ body }: Request, res: Response) => {
            const categoryBody = body as ICategory;

            if (categoryIsValid(categoryBody)) {
                const savedCategory = await addCategory(categoryBody);

                if (savedCategory) {
                    savedCategory.items = [];
                    return res.json(savedCategory).status(200);
                }
            }
            res.sendStatus(400);
        });
    }
}
