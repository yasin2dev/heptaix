"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TokenUser } from '../../../server/types';

export default function Navbar() {
    const [isVal, setIsVal] = useState<boolean>(false);
    const [user, setUser] = useState<TokenUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("JWT_TOKEN");
        const user = localStorage.getItem("USER");
        if (token) {
            setIsVal(true);
            if (user) {
                setUser(JSON.parse(user))
            }
        } else {
            setIsVal(false);
        }
    }, [])

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
                    </Link>
                    {
                        !isVal ?
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <Link href="/login" className="text-sm  text-amber-600 dark:text-amber-500 hover:underline">Login</Link>
                            <Link href="/register" className="text-sm  text-amber-600 dark:text-amber-500 hover:underline">Register</Link>
                        </div>
                        :
                        <p>Welcome {user?.name}</p>
                    }
                </div>
            </nav>
        </>
    )
}
