import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export const PageSidebar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside className="w-0 lg:w-64 h-auto transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <nav className="h-full px-3 py-4 overflow-y-auto">
        {children}
      </nav>
    </aside>
  );
}

export const PageSidebarContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="space-y-2 font-medium">
      {children}
    </ul>
  )
}

interface PageSidebarLinkProps {
  href: string,
  icon?: React.ReactNode
}

export const PageSidebarLink: React.FC<PropsWithChildren<PageSidebarLinkProps>> = ({ children, icon, ...props }) => {
  return (
    <li>
      <Button as={Link} startContent={icon} variant='light' {...props} fullWidth className="justify-start">
        {children}
      </Button>
    </li>
  );
}