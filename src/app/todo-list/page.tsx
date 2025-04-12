"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Todo } from "../../../server/types";
import axios from "axios";
import Image from "next/image";

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    handleTodo();
  }, []);

  return (
    <div className="container flex-auto flex-wrap max-h-screen m-auto space-x-2">
      {todos.map((a: Todo) => (
        <Card key={a.id} className="w-auto mt-8">
          <CardHeader>
            <CardTitle>{a.title}</CardTitle>
            <CardDescription>{a.description}</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[6rem]">
            {a.textContent}
          </CardContent>
          <CardFooter>
            <p className="text-xs">01/01/1970</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  async function handleTodo() {
    await axios
      .get("http://localhost:4001/api/todo/lorem", { params: { count: 5 } })
      .then((result) => {
        setTodos(result.data);
      });
  }
}
