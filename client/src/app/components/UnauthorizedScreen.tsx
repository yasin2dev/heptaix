import React from 'react'

export function UnauthorizedScreen() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <span className="self-center text-2xl whitespace-nowrap text-primary font-bold italic">Heptaix</span>
                <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 tracking-[-.01em]">
                        Get started by signing in or creating an account.
                    </li>
                    <li className="tracking-[-.01em]">
                        Manage your todos, tags and more.
                    </li>
                </ol>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-muted-foreground">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/yasin2dev/heptaix"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </footer>
        </div>
    )
}
