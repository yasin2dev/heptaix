"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaDoorClosed, FaGear, FaCircleUser } from "react-icons/fa6"

import { TokenUser } from '../../../server/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isVal, setIsVal] = useState<boolean>(false);
  const [user, setUser] = useState<TokenUser | null>(null);

  const { setTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    const user = localStorage.getItem("USER");
    if (token) {
      if (user) {
        setUser(JSON.parse(user))
        setIsVal(true);
      }
    } else {
      setIsVal(false);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    window.location.href = "/";
  }

  return (
    <>
      <nav className="bg-white dark:bg-black border-2 border-b-amber-600">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
          </Link>
          {
            !isVal
              ?
              <NavigationMenu className="list-none font-semibold gap-4">
                <NavigationMenuItem>
                  <Link href="/getting-started" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                      Getting Started
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenu>
              :
              <NavigationMenu className="list-none font-semibold gap-4">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                      My Screen
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/todo-list" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                      To-do List
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenu>
          }
          {
            !isVal ?
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <Link href="/login" className="">
                  <Button className='bg-amber-50 border-2 text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white cursor-pointer'>
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="text-sm text-amber-600 dark:text-amber-600">
                  <Button className='bg-amber-600 border-2 border-amber-600 hover:bg-amber-50 hover:text-amber-600 cursor-pointer'>
                    Register
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              :
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className='bg-amber-600 text-white'>{`${user?.name[0].toUpperCase()}${user?.surname[0].toUpperCase()}`}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuLabel>{`${user?.name} ${user?.surname}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile <FaCircleUser /></DropdownMenuItem>
                    <DropdownMenuItem>Settings <FaGear /></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log out <FaDoorClosed /></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          }
        </div>
      </nav>
    </>
  )
}
