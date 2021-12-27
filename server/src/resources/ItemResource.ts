import { ICategory } from "@common/models/ICategory";
import { ICheckedItem } from "@common/models/ICheckedItem";
import { IItem } from "@common/models/IItem";
import { positiveIntegerIsValid } from "common/dist/utils/baseValidators";
import { RowDataPacket } from "mysql2";
import { DatabaseHandler } from "./../persistance/databasehandler";

const getItemsForCategory = async ({ id }: ICategory): Promise<IItem[] | undefined> => {
    if (positiveIntegerIsValid(id)) {
        let items: IItem[] | undefined = undefined;

        await DatabaseHandler.useConnection(async (connection) => {
            const itemsPromise = connection.execute("SELECT * FROM item WHERE category_id = ?", [id]);
            const checksPromise = connection.execute("SELECT * FROM checked_items WHERE category_id = ?", [id]);
            const [[rawItems], [rawChecks]] = await Promise.all([itemsPromise, checksPromise]);

            if (rawItems && rawChecks) {
                const storedItems = rawItems as IItem[];
                const checks = rawChecks as ICheckedItem[];
                items = storedItems.map((item: IItem) => ({ ...item, values: checks.filter((checkData) => checkData.item_id === item.id).map(({ checked }) => new Boolean(checked).valueOf()) }));
            }
        });

        return items;
    }
    throw new Error(`Invalid category id: '${id}'`);
};

const addItemToCategory = async (itemName: string, { id }: ICategory): Promise<IItem | undefined> => {
    if (!positiveIntegerIsValid(id)) {
        throw new Error(`Invalid category id: '${id}'`);
    }

    let storedItemData: IItem | undefined = undefined;
    await DatabaseHandler.useConnection(async (connection) => {
        await connection.execute("INSERT INTO item (label, category_id) VALUES (?, ?)", [itemName, id]);
        const [rows] = (await connection.execute("SELECT * FROM item WHERE label = ? AND category_id = ?", [itemName, id])) as RowDataPacket[];

        if (rows.length === 1) {
            const itemData = rows[0] as IItem;
            const [activityChecks] = (await connection.execute("SELECT * FROM checked_items WHERE item_id = ? AND category_id = ?", [itemData.id, id])) as RowDataPacket[];
            storedItemData = { ...itemData, values: Array(activityChecks.length).fill(false) };
        }
    });

    return storedItemData;
};

export { getItemsForCategory, addItemToCategory };
