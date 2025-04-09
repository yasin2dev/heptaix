import { z } from "zod";

const zTodo = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
});

export type Todo = z.infer<typeof zTodo>;