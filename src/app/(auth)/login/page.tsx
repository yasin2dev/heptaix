"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent } from "@/ui/card";

import LoadingScreen from "@/app/components/LoadingScreen";
import { useAuth } from "@/app/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string>();
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return toast.warning("Oops! Looks like you already logged in.", {
      closeButton: true,
      richColors: true,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
        <CardContent>
          {response ? (
            <p className="text-center text-red-100 font-semibold gap-2 italic bg-red-600 rounded-sm mt-2 mb-2 p-2">
              {response.replace('"', "")}
            </p>
          ) : (
            <></>
          )}
          <h2 className="text-2xl font-semibold text-center mb-6 text-amber-600">
            Welcome again!
          </h2>
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
            <Button
              onClick={handleLoginUser}
              type="submit"
              className="w-full text-white bg-amber-600 hover:bg-amber-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  async function handleLoginUser() {
    if ((email && password !== "") || "" || null) {
      const formData = {
        email: email.trim(),
        password: password,
      };
      await axios
        .post(
          `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/user/login`,
          formData
        )
        .then((resp) => {
          if (!isAuthenticated) {
            if (resp.status === 200) {
              login(resp.data.token, JSON.stringify(resp.data));
              window.location.href = "/";
            }
          }
        })
        .catch((e) => {
          if (e.response) {
            setResponse(e.response.data);
          }
          console.error(e);
        });
    }
  }
}
