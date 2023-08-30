'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { twMerge } from 'tailwind-merge'

type UserAvatarProps = AvatarProps

export function UserAvatar(props: UserAvatarProps) {
  const { data } = useSession()

  const user = data?.user

  return (
    <Avatar className={twMerge('h-8 w-8')} {...props}>
      {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
    </Avatar>
  )
}
