'use client'

import { Container } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';
import { PageSidebar, PageSidebarContent, PageSidebarLink } from './PageSidebar';
import PageHeader from './PageHeader';

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className='bg-foreground-100 flex flex-row flex-wrap'>      
    {children}  
    </main>
  )
}

export const PageContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <article className='flex-1 lg:rounded-tl-large bg-foreground-50 m-0 box-border overflow-y-auto h-screen max-h-[calc(100vh-80px)] grow'>
      <Container className='py-10 px-5'>
        {children}
      </Container>
    </article>
  )
}

Page.PageHeader = PageHeader
Page.Content = PageContent
Page.Sidebar = PageSidebar
Page.PageSidebarContent = PageSidebarContent
Page.PageSidebarLink = PageSidebarLink


export default Page;