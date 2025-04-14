import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import type { Todo } from "../../types/todo";
import { createTodo, listTodos } from "../../db";
import verifyToken from "../../helper/auth/jwtToken";

const todoRouter = Router();

todoRouter.get("/list", (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const jwtResult = verifyToken(authHeader)
  if (!jwtResult) {
    res.status(500).send("Internal Server Error");
  } else if (jwtResult.success) {
    listTodos(jwtResult.payload.id).then((result) => {
      res.status(200).json(result)
    })
  } else {
    res.status(400).send(jwtResult.error)
  }
})

todoRouter.post("/create", (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const jwtResult = verifyToken(authHeader);

  const { title, description, textContent } = req.body;
  if (!title || !textContent || title === "" || textContent === "") { res.sendStatus(400); return; }

  if (!jwtResult) {
    res.status(500).send("Internal Server Error");
  } else if (jwtResult.success) {
    const todoId = randomUUID();
    createTodo(todoId, title, textContent, jwtResult.payload.id, description);
    res.status(201).json({ todoId, title, description, textContent });
  } else {
    res.status(406).send(jwtResult.error)
  }
})

export default todoRouter;
