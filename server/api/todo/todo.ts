import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

import { createTodo, deleteTodo, listTodos } from "@server/db";
import { verifyToken } from "../../auth/index";
import { decrypt, encrypt } from "@heptaix/common/helpers/crypto";

const todoRouter = Router();

todoRouter.get("/list", (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const jwtResult = verifyToken(authHeader);
  
  if (!jwtResult) {
    res.status(500).send("Internal Server Error");
  } else if (jwtResult.success) {
    listTodos(jwtResult.payload.id).then(async (result) => {
      const decryptedTodos = await Promise.all(
        result.map(async (todo) => ({
          ...todo,
          title: await decrypt(todo.title, process.env.TODO_ENC_KEY!),
          textContent: await decrypt(todo.textContent, process.env.TODO_ENC_KEY!),
          description: await decrypt(todo.description, process.env.TODO_ENC_KEY!)
        }))
      );
      res.status(200).json(decryptedTodos);
    })
  } else {
    res.status(400).send(jwtResult.error)
  }
})

todoRouter.post("/create", async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const jwtResult = verifyToken(authHeader);

  const { title, description, textContent, createdAt } = req.body;
  if (!title || !textContent || title === "" || textContent === "") { res.status(400).send("Empty Field"); return; }
  if (!process.env.TODO_ENC_KEY) { res.status(500).send("Internal Server Error"); return; }

  if (!jwtResult) {
    res.status(500).send("Internal Server Error");
  } else if (jwtResult.success) {
    const todoId = randomUUID();
    // Encrypt todo title, text content and description
    // @TODO - better encryption syntax
    const encTitle = await encrypt(title, process.env.TODO_ENC_KEY);
    const encContent = await encrypt(textContent, process.env.TODO_ENC_KEY);
    const encDescription = await encrypt(description, process.env.TODO_ENC_KEY);

    createTodo(todoId, encTitle, encContent, jwtResult.payload.id, createdAt, encDescription);
    res.status(201).json({ todoId, title, description, textContent, createdAt });
  } else {
    res.status(406).send(jwtResult.error)
  }
})

todoRouter.post("/delete", async (req: Request, res: Response) => {
  const todoId = req.body['todoId'];

  const authHeader = req.headers['authorization'];
  const jwtResult = verifyToken(authHeader);

  if (!jwtResult) {
    res.status(500).send('Internal Server Error');

  } else if (jwtResult.success) {

    const deletedResult = await deleteTodo(todoId);
    res.status(200).json(deletedResult);

  } else {
    res.status(406).send(jwtResult.error);
  }

})

export default todoRouter;