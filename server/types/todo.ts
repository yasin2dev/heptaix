import { z } from "zod";

const zTodo = z.object({
    id: z.string().uuid(),
    title: z.string(),
    textContent: z.string(),
    description: z.string(),
});

const zCreateTodo = zTodo.omit({ id: true });
export type Todo = z.infer<typeof zTodo>;
export type CreateTodo = z.infer<typeof zCreateTodo>;