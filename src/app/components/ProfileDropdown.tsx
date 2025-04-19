import React from 'react';

import { FaCircleUser, FaDoorClosed, FaGear } from 'react-icons/fa6';

import { Avatar, AvatarFallback } from '@/ui/avatar';
import { SidebarMenuButton } from '@/ui/sidebar';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/ui/dropdown-menu';

import { ProfileDropdownProps } from '../types';

import { useAuth } from '../contexts/AuthContext';


export default function ProfileDropdown({ user }: ProfileDropdownProps) {
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
