import { ICategory } from "@common/models/ICategory";
import { ICheckedItem } from "@common/models/ICheckedItem";
import { IItem } from "@common/models/IItem";
import { positiveIntegerIsValid } from "common";
import { RowDataPacket } from "mysql2";
import { DatabaseHandler } from "./../persistance/databasehandler";

const getItemsForCategory = async (
    activityFilters: string[],
    { id }: ICategory,
): Promise<IItem[] | undefined> => {
    if (positiveIntegerIsValid(id)) {
        let items: IItem[] | undefined = undefined;

        await DatabaseHandler.useConnection(async (connection) => {
            const hasFilters = activityFilters.length > 0;

            const [rawActivityIds] = (await connection.execute(
                `SELECT id FROM activity_data ${hasFilters
                    ? `WHERE label IN (${Array(activityFilters.length)
                        .fill("?")
                        .join(",")})`
                    : ""
                }`,
                hasFilters ? activityFilters : undefined,
            )) as RowDataPacket[];
            const activityIds = rawActivityIds.map(
                (rawId: { id: number }) => rawId.id,
            );

            const checksParams = hasFilters ? [id, ...activityIds] : [id];
            const checksQuery = `SELECT * FROM checked_items WHERE category_id = ? ${hasFilters
                    ? `AND checked = TRUE AND activity_id IN (${Array(activityIds.length)
                        .fill("?")
                        .join(",")})`
                    : ""
                }`;

            const itemsPromise = connection.execute(
                `SELECT DISTINCT i.* FROM item_data i ${hasFilters
                    ? `JOIN checked_items ci ON i.id = ci.item_id AND checked = TRUE AND activity_id IN (${Array(
                        activityIds.length,
                    )
                        .fill("?")
                        .join(",")})`
                    : ""
                } WHERE i.category_id = ? ORDER BY position`,
                hasFilters ? [...activityIds, id] : [id],
            );
            const checksPromise = connection.execute(checksQuery, checksParams);
            const [[rawItems], [rawChecks]] = await Promise.all([
                itemsPromise,
                checksPromise,
            ]);

            if (rawItems && rawChecks) {
                const storedItems = rawItems as IItem[];
                const checks = rawChecks as ICheckedItem[];
                items = storedItems.map((item: IItem) => ({
                    ...item,
                    values: activityIds.map(
                        (activityId: number) =>
                            new Boolean(
                                checks.find(
                                    (check) =>
                                        check.activity_id === activityId &&
                                        check.item_id === item.id,
                                )?.checked || false,
                            ),
                    ),
                }));
            }
        });

        return items;
    }
    throw new Error(`Invalid category id: '${id}'`);
};

const addItemToCategory = async (
    itemName: string,
    { id }: ICategory,
): Promise<IItem | undefined> => {
    if (!positiveIntegerIsValid(id)) {
        throw new Error(`Invalid category id: '${id}'`);
    }

    let storedItemData: IItem | undefined = undefined;
    await DatabaseHandler.useConnection(async (connection) => {
        await connection.execute(
            "INSERT INTO item (label, category_id) VALUES (?, ?)",
            [itemName, id],
        );
        const [rows] = (await connection.execute(
            "SELECT * FROM item WHERE label = ? AND category_id = ?",
            [itemName, id],
        )) as RowDataPacket[];

        if (rows.length === 1) {
            const itemData = rows[0] as IItem;
            const [activityChecks] = (await connection.execute(
                "SELECT * FROM checked_items WHERE item_id = ? AND category_id = ?",
                [itemData.id, id],
            )) as RowDataPacket[];
            storedItemData = {
                ...itemData,
                values: Array(activityChecks.length).fill(false),
            };
        }
    });

    return storedItemData;
};

const updateItem = async ({
    id,
    label,
    values,
}: IItem): Promise<IItem | undefined> => {
    let updatedItem: IItem | undefined = undefined;

    await DatabaseHandler.useConnection(async (connection) => {
        await connection.execute("UPDATE item SET label = ? WHERE id = ?", [
            label,
            id,
        ]);
        const [rows] = (await connection.execute(
            "SELECT * FROM item WHERE id = ?",
            [id],
        )) as RowDataPacket[];
        if (rows.length === 1) {
            updatedItem = { ...rows[0], values };
        }
    });

    return updatedItem;
};

const checkItem = async (item: IItem): Promise<boolean[]> => {
    let storedChecks: boolean[] = [];

    await DatabaseHandler.useConnection(async (connection) => {
        const [checkRows] = (await connection.execute(
            "SELECT * FROM checked_items WHERE item_id = ?",
            [item.id],
        )) as RowDataPacket[];
        const checks = (checkRows as ICheckedItem[]).map((check) => ({
            ...check,
            checked: new Boolean(check.checked).valueOf(),
        }));

        if (item.values.length !== checks.length) {
            throw new Error("Inconsistent activity count when updating the checks.");
        }

        const promises = item.values
            .map((value, index) => {
                if (value !== checks[index].checked) {
                    const { item_id, activity_id } = checks[index];
                    if (value) {
                        return connection.execute(
                            "INSERT INTO activityitem (item_id, activity_id) VALUES (?, ?)",
                            [item_id, activity_id],
                        );
                    } else {
                        return connection.execute(
                            "DELETE FROM activityitem WHERE item_id = ? AND activity_id = ?",
                            [item_id, activity_id],
                        );
                    }
                }
            })
            .filter((promise) => promise !== undefined);
        await Promise.all(promises);

        const [rawStoredChecks] = (await connection.execute(
            "SELECT * FROM checked_items WHERE item_id = ?",
            [item.id],
        )) as RowDataPacket[];
        storedChecks = (rawStoredChecks as ICheckedItem[]).map((check) =>
            new Boolean(check.checked).valueOf(),
        );
    });

    return storedChecks || Array(item.values.length).fill(false);
};

const deleteItem = async ({ id }: IItem): Promise<void> => {
    await DatabaseHandler.execute("DELETE FROM item WHERE id = ?", [id]);
};

export {
    getItemsForCategory,
    addItemToCategory,
    updateItem,
    checkItem,
    deleteItem,
};
