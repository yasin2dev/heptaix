import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="/login" className="text-sm  text-amber-600 dark:text-amber-500 hover:underline">Login</Link>
                        <Link href="/register" className="text-sm  text-amber-600 dark:text-amber-500 hover:underline">Register</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
