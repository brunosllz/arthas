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
        className="relative h-[42px] w-[42px] rounded-full px-3 text-secondary-foreground"
        size="sm"
      >
        <BellIcon size={18} />

        {hasUnreadNotifications && (
          <div className="absolute -right-1.5 -top-1 flex h-4 w-auto min-w-[16px] items-center justify-center rounded-full bg-purple-600 px-[4.5px] py-0.5">
            <span className="text-[10px] font-medium leading-none">10</span>
          </div>
        )}
      </Button>
    </PopoverTrigger>
  )
}
