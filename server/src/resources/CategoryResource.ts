import { ICategory } from "@common/models/ICategory";
import { IItem } from "@common/models/IItem";
import { RowDataPacket } from "mysql2";
import { DatabaseHandler } from "../persistance/databasehandler";
import { getItemsForCategory } from "./ItemResource";

const getCategories = async (filters: string[]): Promise<ICategory[]> => {
	const baseQuery = "SELECT * FROM category_data";
	const filteredQuery = `SELECT DISTINCT c.* FROM category_data c JOIN checked_items ci ON c.id = ci.category_id AND checked = TRUE JOIN activity a ON a.id = ci.activity_id AND a.label IN (${Array(
		filters.length
	)
		.fill("?")
		.join(",")})`;

	const query = filters.length > 0 ? filteredQuery : baseQuery;
	const params = filters.length > 0 ? filters : undefined;
	const [rows] = (await DatabaseHandler.execute(query, params)) as RowDataPacket[];

	const itemPromises: Promise<IItem>[] = rows.map((category: ICategory) => getItemsForCategory(filters, category));
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
