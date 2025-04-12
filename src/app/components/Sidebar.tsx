"use client";

import React, { useEffect, useState } from 'react'

import AuthorizedNav from './AuthorizedSidebar';
import UnauthorizedNav from './UnauthorizedSidebar';

import { TokenUser } from '../../../server/types';

export default function Sidebar() {
  const [isVal, setIsVal] = useState<boolean>(false);
  const [user, setUser] = useState<TokenUser | undefined>(undefined);

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
    <div>
      {
        !isVal
          ?
          <UnauthorizedNav />
          :
          <AuthorizedNav user={user} />
      }
    </div>
  )
}
