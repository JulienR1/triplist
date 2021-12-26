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

const updateCategory = async ({ id, label, items }: ICategory): Promise<ICategory | undefined> => {
    let updatedCategoryData: ICategory | undefined = undefined;
    await DatabaseHandler.useConnection(async (connection) => {
        await connection.execute("UPDATE category SET label = ? WHERE id = ?", [label, id]);
        const [rows] = (await connection.execute("SELECT * FROM category WHERE id = ?", [id])) as RowDataPacket[];
        if (rows.length === 1) {
            updatedCategoryData = { ...rows[0], items };
        }
    });

    return updatedCategoryData;
};

const addCategory = async ({ label }: ICategory): Promise<ICategory | undefined> => {
    let newCategoryData: ICategory | undefined = undefined;
    await DatabaseHandler.useConnection(async (connection) => {
        await connection.execute("INSERT INTO category (label) VALUES (?)", [label]);
        const [rows] = (await connection.execute("SELECT * FROM category WHERE label = ?", [label])) as RowDataPacket[];
        // TODO: What happens if there are 2 categories w/ the same name?
        if (rows.length === 1) {
            newCategoryData = rows[0];
        }
    });

    return newCategoryData;
};

const removeCategory = async ({ id }: ICategory): Promise<void> => {
    await DatabaseHandler.execute("DELETE FROM category WHERE id = ?", [id]);
};

export { getCategories, addCategory, removeCategory, updateCategory };
