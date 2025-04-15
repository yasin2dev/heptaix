import to from "await-to-js";
import { DB } from "../../db/db";
import { RegisterUser } from "../../types";

export async function createUser(name: string, surname: string, username: string, email: string, hash: string): Promise<RegisterUser[]> {
    if (!name || !surname || !username) return [];

    const SQL = DB<RegisterUser[]>`
INSERT INTO 
    "auth"."users" 
    ("name", "surname", "username", "email", "hash") 
VALUES 
    (${name}, ${surname}, ${username}, ${email}, ${hash})
`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}