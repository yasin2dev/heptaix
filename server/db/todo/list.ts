import to from "await-to-js";
import { DB } from "../../db/db";
import { Todo, User } from "../../types";

export async function listTodos(userId: string): Promise<Todo[]> {
    const SQL = DB<Todo[]>`
SELECT
  * 
FROM 
  "public"."todos"
WHERE "userId" = ${userId}
`;
    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}