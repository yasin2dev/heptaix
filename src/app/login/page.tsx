'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string>();
  const [logged, setLogged] = useState<boolean>(false);


  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setLogged(true);
    }
  })

  return (
    <>
      {
        !logged
          ?
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200">
            <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
              <CardContent>
                {response ? <p className="text-center text-red-100 font-semibold gap-2 italic bg-red-600 rounded-sm mt-2 mb-2 p-2">{response.replace('"', '')}</p> : <></>}
                <h2 className="text-2xl font-semibold text-center mb-6 text-amber-600">Welcome again!</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="dark:text-black"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="dark:text-black"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="text-right text-sm">
                    <Link href="/" className="text-amber-500 hover:underline">
                      Forgetten Password *_* ?
                    </Link>
                  </div>
                  <Button onClick={handleLoginUser} type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          :
          window.location.href = "/"
      }
    </>
  );

  async function handleLoginUser() {
    if (email && password !== '' || "" || null) {
      const formData = {
        email: email.trim(),
        password: password,
      }
      await axios.post("http://localhost:4001/api/user/login", formData)
        .then((resp) => {
          let token = localStorage.getItem("JWT_TOKEN");
          if (!token) {
            if (resp.status === 200) {
              localStorage.setItem("JWT_TOKEN", resp.data.token)
              localStorage.setItem("USER", JSON.stringify(resp.data))
              window.location.href = "/";
            }
          } else if (token) {
            console.log("Already logged in.")
          }
        })
        .catch((e) => {
          if (e.response) {
            setResponse(e.response.data)
          }
          console.error(e);
        });
    }
  }
}