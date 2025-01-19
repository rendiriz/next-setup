'use client';

import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

import { PanelLeft } from 'lucide-react';

import { AppSidebar } from './_components/app-sidebar';
import { SidebarRight } from './_components/sidebar-right';

export default function Sidebarlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="border border-blue-500">Header</nav>

      <div className="flex max-h-dvh w-full overflow-hidden">
        <SidebarProvider className="max-h-dvh w-fit overflow-hidden">
          <AppSidebar />
        </SidebarProvider>

        <SidebarInset className="w-full">{children}</SidebarInset>
      </div>

      {/* <SidebarInset>
        <main>
          <SidebarTriggerUhuy side="left" />
          <SidebarTriggerUhuy side="right" />

          {children}
        </main>

        <SidebarRight side="right" />
      </SidebarInset> */}
    </>
  );
}

function SidebarTriggerUhuy({
  side = 'left',
  ...props
}: React.ComponentProps<typeof Button> & { side?: 'left' | 'right' }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-7 w-7 ${side === 'right' ? 'rotate-180' : ''}`}
      onClick={() => toggleSidebar()}
      aria-label={`Toggle ${side} sidebar`}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle {side} sidebar</span>
    </Button>
  );
}
