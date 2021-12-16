import mysql, { PoolOptions } from "mysql2";
import { Connection, Pool } from "mysql2/promise";

export class DatabaseHandler {
	private static instance: DatabaseHandler | null = null;

	private pool: Pool;

	private constructor() {
		if (!process.env.MAX_DB_CONNECTION_COUNT) {
			throw new Error("No connection limit has been set.");
		}

		const connectionLimit = parseInt(process.env.MAX_DB_CONNECTION_COUNT);
		const options: PoolOptions = {
			host: process.env.DB_URL,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: "triplist",
			waitForConnections: true,
			connectionLimit,
			queueLimit: 0,
		};
		this.pool = mysql.createPool(options).promise();
	}

	private static Instance(): DatabaseHandler {
		if (this.instance === null) {
			this.instance = new DatabaseHandler();
		}
		return this.instance;
	}

	public static execute(query: string) {
		return this.Instance().pool.execute(query);
	}

	public static async useConnection(fn: (conn: Connection) => void | Promise<void>): Promise<void> {
		const connection = await this.Instance().pool.getConnection();
		await fn(connection);
		connection.release();
	}
}
