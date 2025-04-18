"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/ui/textarea";

import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { 
  Dialog,
  DialogClose, 
  DialogContent, 
  DialogFooter,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/ui/dialog";

import type { CreateTodo, Todo } from "../../../server/types";
import { epochToDateString } from "../../../server/helper";

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");

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
    <>
      <div className="container m-auto ml-auto flex mt-8 space-x-2 justify-end w-full">
        <Dialog >
          <DialogTrigger asChild>
            <Button className="bg-accent-foreground hover:cursor-pointer">
              <Plus />Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Create Todo</DialogTitle>
            </DialogHeader>
            <div className="gap-4 space-y-4 py-4">
              <Input id="todoTitle" placeholder="Todo Title" className="col-span-3" autoComplete="off" onChange={(e) => setTodoTitle(e.target.value)} />
              <Input id="todoDescription" placeholder="Todo Description" className="col-span-3" autoComplete="off" onChange={(e) => setTodoDescription(e.target.value)} />
              <Textarea placeholder="Todo Content" onChange={(e) => setTextContent(e.target.value)}/>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full hover:cursor-pointer" type="submit" onClick={handleCreateTodo}>Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="container flex-col-reverse max-h-screen m-auto gap-10">
        {todos.map((a: Todo) => (
          <Card key={a.todoId} className="w-auto mt-8 gap-2 ">
            <CardHeader className="space-y-0">
              <CardTitle>{a.title}</CardTitle>
              <CardDescription>{a.description}</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[6rem] whitespace-pre-wrap line-clamp-3">
              {a.textContent}
            </CardContent>
            <CardFooter className="flex justify-end w-full mt-4">
              <p className="text-xs">{epochToDateString(a.createdAt)}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
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
      title: todoTitle,
      description: todoDescription,
      textContent: textContent,
      createdAt: new Date(Date.now()).getTime(),
    }
    try {
      await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/todo/create`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }).then((result) => {
        setTodos(prev => [...prev, result.data]);
        setTextContent("");
        setTodoTitle("");
        setTodoDescription("");
      }).finally(() => handleTodo())
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
      } else if (todoTitle.trim() === "" || textContent.trim() === "") {
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
