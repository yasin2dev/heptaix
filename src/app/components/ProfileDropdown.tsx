import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { FaCircleUser, FaDoorClosed, FaGear } from 'react-icons/fa6'
import { ProfileDropdownProps } from '../types'
import { SidebarMenuButton } from '@/components/ui/sidebar'


export default function ProfileDropdown({ user }: ProfileDropdownProps) {

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    window.location.href = "/";
  }

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
        <DropdownMenuItem onClick={handleLogout}>Log out <FaDoorClosed /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
