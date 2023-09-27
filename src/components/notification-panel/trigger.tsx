'use client'

import { BellIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket-io'
import { PopoverTrigger } from '../ui/popover'
import { useSession } from 'next-auth/react'

interface EventPayload {
  payload: {
    count: number
  }
}

export function Trigger() {
  const [unreadNotificationsAmount, setUnreadNotificationsAmount] = useState(0)
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      socket.connect()
      socket.auth = { token: session?.user.accessToken }

      socket.on('count-unread-notifications', ({ payload }: EventPayload) => {
        const { count } = payload
        setUnreadNotificationsAmount(count)
      })

      socket.on('new-notification-created', () => {
        setUnreadNotificationsAmount((state) => state + 1)
      })

      socket.on('notification-read', () => {
        setUnreadNotificationsAmount((state) => state - 1)
      })
    }
  }, [session])

  const hasUnreadNotifications = unreadNotificationsAmount > 0

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="relative h-6 gap-1 rounded-full px-2 text-secondary-foreground"
        size="sm"
      >
        <BellIcon className="h-3 w-3" />
        {hasUnreadNotifications && (
          <>
            <span>{String(unreadNotificationsAmount).padStart(2, '0')}</span>

            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
          </>
        )}
      </Button>
    </PopoverTrigger>
  )
}
