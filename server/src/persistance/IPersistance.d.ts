import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type Rows = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
export type Fields = FieldPacket[];
