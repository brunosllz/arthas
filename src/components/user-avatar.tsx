'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'

export function UserAvatar() {
  const { data } = useSession()

  const user = data?.user

  return (
    <Avatar className="h-8 w-8">
      {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
    </Avatar>
  )
}
