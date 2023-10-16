'use client'

import { useSession } from 'next-auth/react'

export function UserInfoLabel() {
  const { data } = useSession()

  const user = data?.user

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium leading-none">{user?.name}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {user?.email}
      </p>
    </div>
  )
}
