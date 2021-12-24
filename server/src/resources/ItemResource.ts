import { ICategory } from "@common/models/ICategory";
import { IItem } from "@common/models/IItem";
import { positiveIntegerIsValid } from "common/dist/utils/baseValidators";
import { RowDataPacket } from "mysql2";
import { DatabaseHandler } from "src/persistance/databasehandler";

const getItemsForCategory = async ({ id }: ICategory): Promise<IItem[]> => {
    if (positiveIntegerIsValid(id)) {
        const [rows] = (await DatabaseHandler.execute("SELECT * FROM item WHERE category_id = ?", [id])) as RowDataPacket[];
        return rows.map((row: IItem) => ({ ...row, values: [] }));
    }
    throw new Error(`Invalid category id: '${id}'`);
};

export { getItemsForCategory };
