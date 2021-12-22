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

export { getActivities, getActivityById, updateActivity };
