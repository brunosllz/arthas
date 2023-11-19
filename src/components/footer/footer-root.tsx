'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function FooterRoot({ children }: { children: ReactNode }) {
  const pathName = usePathname()

  return <>{pathName !== '/projects' && children}</>
}
