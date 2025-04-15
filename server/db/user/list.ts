import to from "await-to-js";
import { DB } from "../../db/db";
import { User } from "../../types";

export async function listUsers(): Promise<User[]> {
    const SQL = DB<User[]>`SELECT * FROM "auth"."users"`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}