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
          <UnauthorizatedScreen />
          :
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

