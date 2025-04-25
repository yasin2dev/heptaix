"use client";

import React from 'react'

import { AuthorizedNav, UnauthorizedNav } from '@client/app/components';

import { useAuth } from '@client/app/contexts';

export function Sidebar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {
        !isAuthenticated
          ?
          <UnauthorizedNav />
          :
          <AuthorizedNav user={user} />
      }
    </div>
  )
}
