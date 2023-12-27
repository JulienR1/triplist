import { ICategory } from "@common/models/ICategory";
import { Router, Request, Response } from "express";
import { RouterHandler } from "../RouterHandler";
import { categoryIsValid } from "common";
import {
    addCategory,
    removeCategory,
    updateCategory,
} from "../../resources/CategoryResource";

export class CategoryHandler extends RouterHandler {
    constructor() {
        super("/category");
    }

    register(router: Router) {
        router.post(this.route, async ({ body }: Request, res: Response) => {
            const categoryBody = body as ICategory;

            if (categoryIsValid(categoryBody)) {
                const categoryData = await updateCategory(categoryBody);
                if (categoryData) {
                    return res.json(categoryData).status(200);
                }
            }
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

        router.delete(this.route, ({ body }: Request, res: Response) => {
            const categoryBody = body as ICategory;

            if (categoryIsValid(categoryBody)) {
                removeCategory(categoryBody);
                return res.json({ ok: true }).status(200);
            }
            res.sendStatus(400);
        });
    }
}
