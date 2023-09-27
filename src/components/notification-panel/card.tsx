'use client'

import { useMutation } from '@tanstack/react-query'
import { externalApi } from '@/libs/axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Notification } from './list'
import { Avatar, AvatarImage } from '../ui/avatar'
import Markdown from 'react-markdown'
import { useRouter } from 'next/navigation'

type CardProps = { notification: Notification }

dayjs.extend(relativeTime)

export function Card({ notification }: CardProps) {
  const router = useRouter()

  const { mutateAsync: readNotification } = useMutation(async () => {
    await externalApi.patch(`/notifications/${notification.id}/read`, {})
  })

  async function handleReadNotification() {
    const notificationIsRead = !!notification.readAt

    if (notificationIsRead) {
      return router.push(`${notification.linkTo}`)
    }

    await readNotification()
    router.push(`${notification.linkTo}`)
  }

  return (
    <a onClick={handleReadNotification} className="cursor-pointer">
      <div
        data-un-read={!notification.readAt}
        className="mt-1 flex items-start gap-4 rounded-md p-2 data-[un-read=true]:bg-accent hover:bg-accent"
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={notification.avatarFrom} alt="" />
        </Avatar>

        <div className="space-y-1.5">
          <Markdown className="max-h-24 overflow-hidden text-xs leading-relaxed">
            {notification.title}
          </Markdown>

          <time className="text-xs text-muted-foreground">
            {dayjs(notification.createdAt).fromNow()}
          </time>
        </div>
      </div>
    </a>
  )
}
