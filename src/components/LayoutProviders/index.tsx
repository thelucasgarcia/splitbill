'use client'

import { PropsWithChildren } from 'react'
import { LayoutNextUIProvider } from './NextUIProvider'
import RadixTheme from './RadixThemeProvider'
import ReactQueryProvider from './ReactQueryProvider'
import { SessionProvider } from 'next-auth/react'

export function LayoutProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <LayoutNextUIProvider>
          <RadixTheme>     
            {children}
          </RadixTheme>
        </LayoutNextUIProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}