"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);
  const [todo, setTodo] = useState<[] | null | any>([]);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setLogged(true);
    }
  }, [])

  return (
    <>
      {
        !logged
          ?
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
              <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
              <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2 tracking-[-.01em]">
                  Get started by editing{" "}
                  <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                    src/app/page.tsx
                  </code>
                  .
                </li>
                <li className="tracking-[-.01em]">
                  Save and see your changes instantly.
                </li>
              </ol>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                Learn
              </a>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
                />
                Examples
              </a>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                Go to nextjs.org →
              </a>
            </footer>
          </div>
          :
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {todo.map((a: any) => (
              <Card key={a.id}>
                <CardContent>
                  <p>{a?.title}</p>
                  <p>{a?.description}</p>
                </CardContent>
              </Card>
            ))
            }
            <Button onClick={handleTodo}>Get Todo</Button>
          </div>
      }
    </>
  );

  async function handleTodo() {
    await axios.get("http://localhost:4001/api/todo/lorem").then((data) => {
      setTodo(data.data)
    })
  }
}

