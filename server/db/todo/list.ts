import to from "await-to-js";
import { DB } from "../../db/db";
import { Todo, User } from "../../types";

export async function listTodos(userId: string): Promise<Todo[]> {
    const SQL = DB<Todo[]>`
SELECT
  t."todoId", t."title", t."textContent", t."description", t."createdAt"
FROM 
  "public"."todos" t
WHERE "userId" = ${userId}
ORDER BY
  t."createdAt" DESC;
`;
    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}