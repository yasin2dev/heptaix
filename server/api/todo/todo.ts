import { Router, Request, Response } from "express";
import { Todo } from "../../types/todo";

const todoRouter = Router();

todoRouter.get("/lorem", (req: Request, res: Response) => {
    const todos: Todo[] =
        [
            {
                id: 1,
                title: 'Todo 1',
                description: 'Todo Description 1',
            },
            {
                id: 2,
                title: 'Todo 2',
                description: 'Todo Description 2',
            },
            {
                id: 3,
                title: 'Todo 3',
                description: 'Todo Description 3',
            },
            
        ]
    res.status(200).json(todos);
})


export default todoRouter;
