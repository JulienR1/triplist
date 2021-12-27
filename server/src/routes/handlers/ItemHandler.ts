import { ICategory } from "@common/models/ICategory";
import { storedStringIsValid } from "common/dist/utils/baseValidators";
import { categoryIsValid } from "common/dist/utils/categoryUtils";
import { Request, Response, Router } from "express";
import { addItemToCategory } from "../../resources/ItemResource";
import { RouterHandler } from "../RouterHandler";

export class ItemHandler extends RouterHandler {
    constructor() {
        super("/item");
    }

    register(router: Router) {
        router.put(this.route, async ({ body }: Request, res: Response) => {
            const category = body.category as ICategory;
            const itemName = body.itemName as string;

            if (categoryIsValid(category) && storedStringIsValid(itemName)) {
                const itemData = await addItemToCategory(itemName, category);
                if (itemData) {
                    return res.json(itemData).status(200);
                }
            }

            res.sendStatus(400);
        });
    }
}
