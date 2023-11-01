import { Avatar } from './ui/avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from './ui/skeleton'
import { getCurrentUser } from '@/actions/get-current-user'
import Image from 'next/image'

type UserAvatarProps = AvatarProps

export async function UserAvatar(props: UserAvatarProps) {
  const user = await getCurrentUser()

  console.log(user)

  return (
    <Avatar className={twMerge('h-12 w-12')} {...props}>
      {user?.avatarUrl ? (
        <Image src={user.avatarUrl} alt={user.name} width={48} height={48} />
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </Avatar>
  )
}
