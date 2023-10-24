'use client'

import ModalCreateBill from '@/lib/containers/bill/ModalCreate';
import { useUrl } from '@/lib/hooks/useUrl';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  const {has} = useUrl()
  return (
    <>
      {children}
      {has('mode', 'create') && <ModalCreateBill />}
    </>
  )
}
