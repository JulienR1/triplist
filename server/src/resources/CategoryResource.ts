import { ICategory } from "@common/models/ICategory";
import { IItem } from "@common/models/IItem";
import { RowDataPacket } from "mysql2";
import { DatabaseHandler } from "src/persistance/databasehandler";
import { getItemsForCategory } from "./ItemResource";

const getCategories = async (): Promise<ICategory[]> => {
    const [rows] = (await DatabaseHandler.execute("SELECT * FROM category")) as RowDataPacket[];

    const itemPromises: Promise<IItem>[] = rows.map((category: ICategory) => getItemsForCategory(category));
    const items = await Promise.all(itemPromises);
    return rows.map((category: ICategory, index: number) => ({ ...category, items: items[index] }));
};

export { getCategories };
