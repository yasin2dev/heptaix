'use client'

import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-start pt-20">
            <div className="text-center bg-gray-700 m-auto top-0 max-w-max justify-center rounded-2xl p-10">
                <p>Welcome. Join Us.</p>
                <form className="grid justify-center gap-2 mt-10" id="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input placeholder="Name" className="w-md rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder="Surname" className="rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <input placeholder="Email Address" className="rounded-md border-blue-300 p-2 border-2 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Username" className="rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input placeholder="Password" type="password" className="rounded-md border-blue-300 border-2 p-2 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button type="submit" className="w-md mt-4 bg-green-600 rounded-l p-2 cursor-pointer" onClick={handleCreateUser}>Join To-do App</button>
            </div>
        </div>
    );
    async function handleCreateUser() {
        if (name && surname && username && email && password !== '' || "" || null) {
            const formData = {
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                username: username.trim(),
                password: password,
            }
            await axios.post("http://localhost:4001/api/use/register", formData)
                .catch(e => console.error(e));

            setName("");
            setSurname("");
            setEmail("");
            setUsername("");
            setPassword("");
        }
    }
}