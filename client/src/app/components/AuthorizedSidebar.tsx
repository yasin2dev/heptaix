"use client"

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { FiHome, FiGithub, FiBookOpen, FiList, FiTag } from 'react-icons/fi';

import type { SidebarLinks, SidebarProps } from '@client/app/types';
import { 
  Sidebar,
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@client/ui';
import { ProfileDropdown } from '@client/app/components';

const mainItems: SidebarLinks[] = [
  {
    title: "My Screen",
    url: "/",
    icon: FiHome,
    target: '_self'
  },
  {
    title: "To-Do List",
    url: "/todo-list",
    icon: FiList,
    target: '_self'
  },
  {
    title: "Preferences",
    url: "/preferences",
    icon: FiTag,
    target: '_self'
  },
]

const footerItems: SidebarLinks[] = [
  {
    title: "Github",
    url: "https://github.com/yasin2dev/heptaix",
    icon: FiGithub,
    target: '_blank'
  },
  {
    title: "Contact",
    url: "#",
    icon: FiBookOpen,
    target: '_self'
  },
]

export function AuthorizedNav({ user }: SidebarProps) {

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader></SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className='justify-center mb-8'>
            <Link href="/">
              <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">Heptaix</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} target={item.target}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex flex-row justify-between">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url} target={item.target}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <ProfileDropdown user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
