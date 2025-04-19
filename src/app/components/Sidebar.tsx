"use client";

import React from 'react'

import AuthorizedNav from './AuthorizedSidebar';
import UnauthorizedNav from './UnauthorizedSidebar';

import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
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
