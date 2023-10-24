'use client'

import Page from '@/components/Page';
import { PropsWithChildren } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function RootLayout({ children, ...props }: PropsWithChildren) {
  return (
    <>
      <Page.PageHeader />
      <Page>
        <Page.Sidebar>
          <Page.PageSidebarContent>
            <Page.PageSidebarLink href="/" icon={<FaArrowRight />}> Dashboard </Page.PageSidebarLink>
            <Page.PageSidebarLink href="/bill" icon={<FaArrowRight />}> Despesas </Page.PageSidebarLink>
          </Page.PageSidebarContent>
        </Page.Sidebar>
        <Page.Content>{children}</Page.Content>
      </Page>
    </>
  )
}
