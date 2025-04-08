"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaDoorClosed, FaGear, FaCircleUser } from "react-icons/fa6"

import { TokenUser } from '../../../server/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isVal, setIsVal] = useState<boolean>(false);
  const [user, setUser] = useState<TokenUser | null>(null);

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
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-2 border-b-amber-600">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
          </Link>
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
              </div>
          }
        </div>
      </nav>
    </>
  )
}
