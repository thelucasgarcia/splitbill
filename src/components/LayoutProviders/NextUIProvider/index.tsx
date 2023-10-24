'use client'

import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function LayoutNextUIProvider({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}