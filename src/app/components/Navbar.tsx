"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button';

import ProfileDropdown from './ProfileDropdown';
import AuthorizatedNav from './AuthorizatedNav';
import UnauthorizatedNav from './UnauthorizatedNav';

import { TokenUser } from '../../../server/types';

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
              <UnauthorizatedNav />
              :
              <AuthorizatedNav />
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
              </div>
              :
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <ProfileDropdown user={user} />
              </div>
          }
        </div>
      </nav>
    </>
  )
}
