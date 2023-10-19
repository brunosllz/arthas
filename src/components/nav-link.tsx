'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link> & {
  disabled?: boolean
}

export function NavLink({ disabled = false, ...props }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === props.href

  return (
    <Link
      data-active={isActive}
      data-disabled={disabled}
      className={twMerge(
        'font-medium text-muted-foreground transition-colors data-[disabled=true]:pointer-events-none data-[active=true]:text-primary hover:text-primary',
        props.className,
      )}
      {...props}
    />
  )
}
