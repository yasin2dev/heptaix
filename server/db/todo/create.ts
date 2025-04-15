import to from "await-to-js";
import { DB } from "../../db/db";
import { Todo } from "../../types";
import { UUID } from "crypto";

export async function createTodo(todoId: UUID, title: string, textContent: string, userId: UUID, createdAt: number, description?: string | null): Promise<Todo[]> {
    if (!todoId || !title || !textContent || !userId) return [];
    if (!description) description = null;

    const SQL = DB<Todo[]>`
INSERT INTO 
    "todo"."todos"
    ("todoId", "title", "textContent", "description", "userId", "createdAt") 
VALUES 
    (${todoId}, ${title}, ${textContent}, ${description}, ${userId}, ${createdAt})
`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}