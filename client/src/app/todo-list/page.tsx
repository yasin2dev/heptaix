'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { Plus } from 'lucide-react';

import { toast } from 'sonner';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from '@client/ui';

import { LoadingScreen } from '@client/app/components';
import { useAuth } from '@client/app/contexts';

import type { CreateTodo, Todo } from '@server/types';
import { epochToDateString } from '@common/helpers/index';

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoDescription, setTodoDescription] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { loading, user } = useAuth();

  useEffect(() => {
    if (user?.token) {
      handleTodo();
    }
  }, [user?.token]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container m-auto ml-auto mt-8 flex justify-end w-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-accent-foreground hover:cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent
            className="min-w-[calc(100%-100px)] w-[calc(100%-100px)] min-h-[calc(100%-100px)] flex flex-col"
            onInteractOutside={e => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Create Todo</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col flex-1 gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Input
                  id="todoTitle"
                  placeholder="Todo Title"
                  autoComplete="off"
                  spellCheck="false"
                  value={todoTitle}
                  onChange={e => setTodoTitle(e.target.value)}
                />
                <Input
                  id="todoDescription"
                  placeholder="Todo Description"
                  autoComplete="off"
                  spellCheck="false"
                  value={todoDescription}
                  onChange={e => setTodoDescription(e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Todo Content"
                className="flex-1 resize-none"
                spellCheck="false"
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button
                className="hover:cursor-pointer"
                type="submit"
                onClick={handleCreateTodo}
              >
                Create
              </Button>
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

  //prettier-ignore
  async function handleTodo() {
    try {
      const request = await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/todo/list`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setTodos(request.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ data: string }>;
      if (axiosError.response?.data.toString().startsWith("Session")) {
        setInterval(() => {
          localStorage.removeItem("JWT_TOKEN");
          window.location.href = "/login";
        }, 3000);
        toast.error(axiosError.response?.data.toString(), {
          closeButton: true,
          richColors: true,
          description:
            "Your session has expired. Redirecting to login page in 3s",
        });
      } else {
        console.error(error);
      }
    }
  }

  // prettier-ignore
  async function handleCreateTodo() {
    const formData: CreateTodo = {
      title: todoTitle.trim(),
      description: todoDescription.trim(),
      textContent: textContent.trim(),
      createdAt: new Date(Date.now()).getTime(),
    };
    try {
      const request = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/todo/create`, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
          // Only clear fields if return status 201 (Created)
          if (request.status === 201) {
            setTodos((prev) => [...prev, request.data]);
            setTextContent("");
            setTodoTitle("");
            setTodoDescription("");
          }
          handleTodo();
          setIsDialogOpen(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ data: string }>;
      if (axiosError.response?.data.toString().startsWith("Session")) {
        setInterval(() => {
          localStorage.removeItem("JWT_TOKEN");
          window.location.href = "/login";
        }, 3000);
        toast.error(axiosError.response?.data.toString(), {
          closeButton: true,
          richColors: true,
          description:
            "Your session has expired. Redirecting to login page in 3s",
        });
      } else if (axiosError.response?.data.toString() === "Empty Field") {
        setIsDialogOpen(true);
        toast.error("Oops! Looks like you missed some fields.", {
          closeButton: true,
          richColors: true,
          description: "Please fill in the required fields.",
        });
      } else {
        console.error(error);
      }
    }
  }
}
