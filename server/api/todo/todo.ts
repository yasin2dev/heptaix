import { Router, Request, Response } from "express";
import { Todo } from "../../types/todo";

const todoRouter = Router();

todoRouter.get("/lorem", (req: Request, res: Response) => {
  const { count } = req.query;
  const todos: Todo[] = [];
  for (let i: number = 1; i <= Number(count); i++) {
    const todo: Todo = {
      id: i,
      title: `Todo ${i}`,
      textContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Voluptatum explicabo quia dolores ducimus beatae repellendus nesciunt reprehenderit obcaecati
                    rem unde aperiam nobis iusto ad maxime ex eius, recusandae illo corrupti.`,
      description: `Todo Description ${i}`
    };
    todos.push(todo);
  }
  res.status(200).json(todos);
})


export default todoRouter;
