import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React from 'react'

export default function UnauthorizatedNav() {
    return (
        <NavigationMenu className="list-none font-semibold gap-4">
            <NavigationMenuItem>
                <Link href="/getting-started" legacyBehavior passHref>
                    <NavigationMenuLink className="list-none hover:underline">
                        <span className='text-black'>Getting Started</span>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    )
}
