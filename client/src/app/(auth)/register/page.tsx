"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";

import { 
  Button, 
  Card,
  CardContent,
  Input
} from "@client/ui";

import { LoadingScreen } from "@client/app/components";
import { useAuth } from "@client/app/contexts";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const { loading, isAuthenticated } = useAuth();
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
      description: "If you want to create new account please logout first >-<",
    });
  }

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-300">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
        <CardContent>
          {response === "Register Successful." ? (
            <p className="text-center text-green-100 font-semibold gap-2 italic bg-green-600 rounded-sm mt-2 mb-2 p-2">
              {response.replace('"', "")}
            </p>
          ) : response === "Invalid email format." ? (
            <p className="text-center text-red-100 font-semibold gap-2 italic bg-red-600 rounded-sm mt-2 mb-2 p-2">
              {response.replace('"', "")}
            </p>
          ) : (
            <></>
          )}
          <h2 className="text-2xl font-semibold text-center mb-6 text-amber-600">
            Welcome! Let's get you register
          </h2>
          <form
            className="space-y-4"
            id="login-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right text-sm">
              <Link href="/login" className="text-amber-500 hover:underline">
                Already have an account?
              </Link>
            </div>
            <Button
              onClick={handleCreateUser}
              type="submit"
              className="w-full text-white bg-amber-600 hover:bg-amber-700"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
  async function handleCreateUser() {
    if (
      (name && surname && username && email && password !== "") ||
      "" ||
      null
    ) {
      const formData = {
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password,
      };
      await axios
        .post(
          `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/user/register`,
          formData
        )
        .then((resp) => {
          if (resp.status === 201) {
            setResponse(resp.data);
            setInterval(() => {
              window.location.href = "/login";
            }, 1000);
          } else {
            setResponse(resp.data);
          }
        });
    }
  }
}
