"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UnauthorizatedScreen from "./components/UnauthorizatedScreen";
import { Todo } from "../../server/types";

export default function Home() {
  const [authorizated, setAuthorizated] = useState<boolean>(false);
  const [todos, setTodos] = useState<[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setAuthorizated(true);
    }
    handleTodo();
  }, [])

  return (
    <>
      {
        !authorizated
          ?
          <UnauthorizatedScreen />
          :
          <div className="container flex flex-wrap justify-between m-auto space-x-2 rtl:space-x-reverse">
            {todos.map((a: Todo) => (
              <Card key={a.id} className="w-[28rem] mt-8">
                <CardHeader>
                  <CardTitle>{a.title}</CardTitle>
                  <CardDescription>{a.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>EXAMPLE TODO CONTENT</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs">01/01/1970</p>
                </CardFooter>
              </Card>
            ))
            }
          </div>
      }
    </>
  );

  async function handleTodo() {
    await axios.get("http://localhost:4001/api/todo/lorem", { params: { count: 32 } }).then((result) => {
      setTodos(result.data)
    })
  }
}

