import { z } from "zod";

const zTodo = z.object({
    todoId: z.string().uuid(),
    title: z.string(),
    textContent: z.string(),
    description: z.string(),
    createdAt: z.number(),
});

const zCreateTodo = zTodo.omit({ todoId: true });
export type Todo = z.infer<typeof zTodo>;
export type CreateTodo = z.infer<typeof zCreateTodo>;