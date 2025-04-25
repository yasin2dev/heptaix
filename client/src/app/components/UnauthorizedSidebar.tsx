"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Play, Github, BookOpen } from "lucide-react";

import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@client/ui";

import { SidebarLinks } from "@client/app/types";

const items: SidebarLinks[] = [
  {
    title: "Getting Started",
    url: "/getting-started",
    icon: Play,
    target: "_self",
  },
  {
    title: "Github",
    url: "https://github.com/yasin2dev/heptaix",
    icon: Github,
    target: "_blank",
  },
  {
    title: "Contact",
    url: "#",
    icon: BookOpen,
    target: "_blank",
  },
];

export function UnauthorizedNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader></SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="justify-center mb-8">
            <Link href="/">
              <span className="self-center text-2xl whitespace-nowrap dark:text-white text-amber-600 font-bold italic">
                Heptaix
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="items-center">
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <Link href="/login">
                  <Button className="bg-amber-50 border-2 text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-amber-600 border-2 border-amber-600 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                    Register
                  </Button>
                </Link>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
