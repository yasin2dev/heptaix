import to from "await-to-js";
import { DB } from "../../db/db";
import { Todo } from "../../types";
import { UUID } from "crypto";

export async function createTodo(id: UUID, title: string, textContent: string, userId: UUID, description?: string | null): Promise<Todo[]> {
    if (!id || !title || !textContent || !userId) return [];
    if (!description) description = null;

    const SQL = DB<Todo[]>`
INSERT INTO 
    "public"."todos"
    ("id", "title", "textContent", "description", "userId") 
VALUES 
    (${id}, ${title}, ${textContent}, ${description}, ${userId})
`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}