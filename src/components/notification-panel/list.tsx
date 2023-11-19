'use client'

import { Button } from '../ui/button'
import { Card } from './card'
import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket-io'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'
import { GearIcon } from '@radix-ui/react-icons'
import { PopoverContent } from '../ui/popover'
import { useSession } from 'next-auth/react'
import { BadgeAlert } from 'lucide-react'

export type Notification = {
  id: string
  title: string
  message: string
  avatarFrom: string
  readAt: Date | null
  createdAt: Date
  linkTo: string
  type: 'message' | 'action ' | 'interaction' | 'info'
}

interface NotificationsEventPayload {
  payload: {
    notifications: Notification[]
  }
}

interface NewNotificationsEventPayload {
  payload: {
    notification: Notification
  }
}

interface NotificationReadEventPayload {
  payload: {
    notificationId: string
    occurredAt: Date
  }
}

export function List() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      socket.auth = { token: session?.user.accessToken }

      socket.on('notifications', ({ payload }: NotificationsEventPayload) => {
        const { notifications } = payload
        setNotifications(notifications)
      })

      socket.on(
        'new-notification-created',
        ({ payload }: NewNotificationsEventPayload) => {
          const { notification } = payload

          const loadedNotifications = notifications.map(
            (notification) => notification,
          )

          loadedNotifications.pop()

          const addNewNotification = [notification, ...loadedNotifications]

          setNotifications(addNewNotification)
        },
      )

      socket.on(
        'notification-read',
        ({ payload }: NotificationReadEventPayload) => {
          const { notificationId, occurredAt } = payload

          const editedNotifications = notifications.map(
            (notification) => notification,
          )

          const foundNotification = editedNotifications.find(
            (notification) => notification.id === notificationId,
          )

          if (foundNotification) {
            foundNotification.readAt = occurredAt
          }

          setNotifications(editedNotifications)
        },
      )
    }
  }, [session, notifications])

  const hasNotifications = notifications?.length > 0

  return (
    <PopoverContent align="end" alignOffset={-16} className="w-80 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Notifications</span>
        <Link
          className="text-muted-foreground hover:text-primary"
          href="/settings/notifications"
        >
          <GearIcon className="h-4 w-4" />
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        {hasNotifications ? (
          notifications.map((notification) => (
            <Card key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <BadgeAlert size={20} />
            <span className="text-sm">Você ainda não possui notificações.</span>
          </div>
        )}

        {hasNotifications && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/notifications">See all</Link>
          </Button>
        )}
      </div>
    </PopoverContent>
  )
}
