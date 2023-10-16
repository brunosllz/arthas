'use client'

import { useSession } from 'next-auth/react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import Link from 'next/link'

export function ProfileLink() {
  const { data } = useSession()

  const user = data?.user

  return (
    <DropdownMenuItem asChild>
      <Link href={`${user?.profileUrl}`}>Meu perfil</Link>
    </DropdownMenuItem>
  )
}
