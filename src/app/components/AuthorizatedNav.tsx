import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React from 'react'

export default function AuthorizatedNav() {
    return (
        <NavigationMenu className="list-none font-semibold gap-4">
            <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                        <span className='text-black'>My Screen</span>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/todo-list" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                        <span className='text-black'>To-Do List</span>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    )
}
