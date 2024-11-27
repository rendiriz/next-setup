import Link from 'next/link';

import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

import { LogOut } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="flex gap-4">
        <Link href={'/'}>Home</Link>
        <Link href={'/login'}>Login</Link>
        {/* <Link href={'/todo'}>Todo</Link>
          <Link href={'/react-query'}>React Query</Link> */}
        <Link href={'/theme'}>Theme</Link>
        <Link href={'/form'}>Form</Link>
        <Link href={'/element'}>Element</Link>
        <Link href={'/dnd'}>Dnd</Link>
        <Link href={'/builder'}>Builder</Link>
      </div>

      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </form>
    </nav>
  );
}
