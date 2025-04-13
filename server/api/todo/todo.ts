import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import jwt, { JwtPayload } from 'jsonwebtoken';

import type { Todo } from "../../types/todo";
import { createTodo, listTodos } from "../../db";

const todoRouter = Router();


todoRouter.get("/lorem", (req: Request, res: Response) => {
  const { count } = req.query;
  const todos: Todo[] = [];
  for (let i: number = 1; i <= Number(count); i++) {
    const todo: Todo = {
      id: randomUUID(),
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


todoRouter.get("/list", (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const jwtToken = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET_KEY;

  if (!jwtSecret) throw new Error("JWT Secret Key is not defined in .env file");
  const decodedToken = jwt.verify(jwtToken, jwtSecret) as JwtPayload;
  
  try {
    listTodos(decodedToken.id).then((result) => {
      res.status(200).json(result)
    })
  } catch (e) {
    console.error(e);
  }
})

todoRouter.post("/create", (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const jwtToken = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET_KEY;

  if (!jwtSecret) throw new Error("JWT Secret Key is not defined in .env file");
  const decodedToken = jwt.verify(jwtToken, jwtSecret) as JwtPayload;

  const { title, description, textContent } = req.body;
  const todoId = randomUUID();

  try {
    createTodo(todoId, title, textContent, decodedToken.id, description);
    res.status(201).json({ todoId, title, description, textContent });
  } catch (e) {
    console.error(e);
  }
})

export default todoRouter;
