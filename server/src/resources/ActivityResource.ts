import { RowDataPacket } from "mysql2";
import { IActivity } from "@common/models/IActivity";
import { DatabaseHandler } from "../persistance/databasehandler";

const getActivities = async (): Promise<IActivity[]> => {
	const [rows] = (await DatabaseHandler.execute("SELECT * FROM activity")) as RowDataPacket[];
	return rows as IActivity[];
};

const getActivityById = async (id: number): Promise<IActivity | undefined> => {
	const [rows] = (await DatabaseHandler.execute("SELECT * FROM activity WHERE id = ?", [id])) as RowDataPacket[];
	return rows.length === 1 ? rows[0] : undefined;
};

const updateActivity = async ({ id, label }: IActivity): Promise<void> => {
	await DatabaseHandler.execute("UPDATE activity SET label = ? WHERE id = ?", [label, id]);
};

const addActivity = async ({ label }: IActivity): Promise<IActivity | undefined> => {
	let newActivityData: IActivity | undefined = undefined;
	await DatabaseHandler.useConnection(async (connection) => {
		await connection.execute("INSERT INTO activity (label) VALUES (?)", [label]);
		const [rows] = (await connection.execute("SELECT * FROM activity WHERE label = ?", [label])) as RowDataPacket[];
		if (rows.length === 1) {
			newActivityData = rows[0];
		}
	});

	return newActivityData;
};

const removeActivity = async ({ id }: IActivity): Promise<void> => {
	await DatabaseHandler.execute("DELETE FROM activity WHERE id = ?", [id]);
};

export { getActivities, getActivityById, updateActivity, addActivity, removeActivity };
