import { ICategory } from "@common/models/ICategory";
import { IItem } from "@common/models/IItem";
import { storedStringIsValid } from "common/dist/utils/baseValidators";
import { categoryIsValid } from "common/dist/utils/categoryUtils";
import { Request, Response, Router } from "express";
import { addItemToCategory, checkItem, deleteItem, updateItem } from "../../resources/ItemResource";
import { RouterHandler } from "../RouterHandler";
import { itemIsValid } from "common/dist/utils/itemUtils";

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

        router.post(this.route, async ({ body }: Request, res: Response) => {
            const itemBody = body as IItem;

            if (itemIsValid(itemBody)) {
                const updatedItem = await updateItem(itemBody);
                if (updatedItem) {
                    return res.json(updatedItem).status(200);
                }
            }
            res.sendStatus(400);
        });

        router.post(`${this.route}/check`, async ({ body }: Request, res: Response) => {
            const itemBody = body as IItem;

            if (itemIsValid(itemBody)) {
                const storedChecks = await checkItem(itemBody);
                return res.json(storedChecks).status(200);
            }

            res.sendStatus(400);
        });

        router.delete(this.route, async ({ body }: Request, res: Response) => {
            const itemBody = body as IItem;

            if (itemIsValid(itemBody)) {
                await deleteItem(itemBody);
                return res.json({ ok: true }).status(200);
            }
            res.sendStatus(400);
        });
    }
}
