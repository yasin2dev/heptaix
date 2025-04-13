"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import type { CreateTodo, Todo } from "../../../server/types";

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setUserToken(token);
    }
    if (userToken) {
      handleTodo();
    }
  }, [userToken]);

  return (
    <div className="container flex-auto flex-wrap max-h-screen m-auto space-x-2">
      <div className="flex mt-8">
        <Input
          className="m-4"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="m-4 bg-accent-foreground" onClick={handleCreateTodo}>
          Create Todo
        </Button>
      </div>
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
    try {
      await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/todo/list`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }).then((result) => {
        setTodos(result.data);
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ data: string }>;
      if (axiosError.response?.data.toString().startsWith("Session")) {
        setInterval(() => {
          localStorage.removeItem("JWT_TOKEN");
          window.location.href = "/login"
        }, 3000)
        toast.error(axiosError.response?.data.toString(), {
          closeButton: true,
          richColors: true,
          description: "Your session has expired. Redirecting to login page in 3s"
        })
      } else {
        console.error(error);
      }
    }
  }

  async function handleCreateTodo() {
    const formData: CreateTodo = {
      title: title,
      description: 'Test Creation',
      textContent: 'Text Content Test',
    }
    try {
      await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/todo/create`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }).then((result) => {
        setTodos(prev => [...prev, result.data]);
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ data: string }>;
      if (axiosError.response?.data.toString().startsWith("Session")) {
        setInterval(() => {
          localStorage.removeItem("JWT_TOKEN");
          window.location.href = "/login"
        }, 3000)
        toast.error(axiosError.response?.data.toString(), {
          closeButton: true,
          richColors: true,
          description: "Your session has expired. Redirecting to login page in 3s"
        })
      } else if (title.trim() === "") {
        toast.error("Oops! Looks like you missed some fields.", {
          closeButton: true,
          richColors: true,
          description: "Please fill in the required fields."
        })
      } else {
        console.error(error);
      }
    }
  }
}
