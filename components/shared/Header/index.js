import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import {getServerSession} from "next-auth";
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import LogoutButton from '@/components/Buttons/LogoutButton';


const Header = async () => {
    const session = await getServerSession(authOptions);

  return (
    <header className='px py-8'>
    <Navbar isBordered>
    <NavbarContent>
    <NavbarBrand>
     <Link href={'/'}>
     <p className="font-bold text-inherit">FITNESS Tracker</p>
     </Link>
    </NavbarBrand>
    </NavbarContent>
    <NavbarContent justify="end">
    <NavbarItem className="flex items-center">

    <ThemeToggle />
    </NavbarItem>
    </NavbarContent>
    {!!session && (
        <>
          <Link href={'/dashboard/new'}>
            Post Exercise
          </Link>
          <LogoutButton />
        </>
      )}
      {!session && (
        <>
          <Link href={'/login'}>Sign In</Link>
          <Link href={'/login'}>Join</Link>
        </>
      )}
    </Navbar>
</header>
  )
}

export default Header