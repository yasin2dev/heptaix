'use client'

import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-start pt-20">
            <div className="text-center bg-blue-900 m-auto top-0 max-w-max justify-center rounded-2xl p-10">
                <p>Welcome Again.</p>
                <form className="grid justify-center gap-2 mt-10" id="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input placeholder="Email Address" className="w-md rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Password" type="password" className="rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button type="submit" className="w-md mt-4 bg-green-600 rounded-l p-2 cursor-pointer" onClick={handleLoginUser}>Login</button>
            </div>
        </div>
    );
    async function handleLoginUser() {
        if (email && password !== '' || "" || null) {
            const formData = {
                email: email.trim(),
                password: password,
            }
            await axios.post("http://localhost:4001/api/user/login", formData)
                .catch((e) => {
                    console.error(e);
                });

            setEmail("");
            setPassword("");
        }
    }
}