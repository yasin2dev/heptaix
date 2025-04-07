'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState<string>();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200">
            <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
                <CardContent>
                    {response ? <p>{response}</p> : <div></div>}
                    <h2 className="text-2xl font-semibold text-center mb-6 text-amber-600">Welcome again!</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
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
    );

    async function handleLoginUser() {
        if (email && password !== '' || "" || null) {
            const formData = {
                email: email.trim(),
                password: password,
            }
            await axios.post("http://localhost:4001/api/user/login", formData)
                .then((resp) => {
                    setResponse(resp.data.replace('"', ''))
                    console.log(resp.data)
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