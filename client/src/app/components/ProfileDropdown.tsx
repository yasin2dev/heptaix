import React from 'react';

import { FaCircleUser, FaDoorClosed, FaGear } from 'react-icons/fa6';

import type { ProfileDropdownProps } from '@client/app/types';
import { 
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  SidebarMenuButton,
} from '@client/ui';

import { useAuth } from '@client/app/contexts';

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='mb-4'>
        <SidebarMenuButton>
          <Avatar className="cursor-pointer">
            <AvatarFallback className='bg-amber-600 text-white'>{`${user?.name[0].toUpperCase()}${user?.surname[0].toUpperCase()}`}</AvatarFallback>
          </Avatar>
          <span>{user?.name} {user?.surname}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>{`${user?.name} ${user?.surname}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile <FaCircleUser /></DropdownMenuItem>
        <DropdownMenuItem>Settings <FaGear /></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out <FaDoorClosed /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
