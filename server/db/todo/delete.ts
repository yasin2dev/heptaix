import to from "await-to-js";
import { UUID } from "crypto";

import { DB } from "@server/db";
import type { Todo } from "@server/types";

export async function deleteTodo(todoId: UUID): Promise<Todo[]> {
    if (!todoId) return [];

    const SQL = DB<Todo[]>`
DELETE FROM
  "todo"."todos"
WHERE
  "todoId" = ${todoId}
RETURNING
  *;
`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}