'use client'

import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { externalApi } from '@/libs/axios'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import Markdown from 'react-markdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Notification } from '@/components/notification-panel/list'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { NotificationCardSkeleton } from './notification-card-skeleton'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

dayjs.extend(relativeTime)

export function NotificationList() {
  const router = useRouter()
  const { ref, inView } = useInView()

  const { mutateAsync: readNotification } = useMutation(
    async (notificationId: string) => {
      await externalApi.patch(`/notifications/${notificationId}/read`)
    },
  )

  const {
    data: notificationPages,
    isLoading: notificationsPagesIsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    total: string
    perPage: number
    page: number
    lastPage: number
    data: Notification[]
  }>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data: response } = await externalApi.get(
        `/notifications/from/me?pageIndex=${pageParam}&pageSize=10`,
      )

      return response
    },
    getNextPageParam: (pages) => {
      return pages.page >= pages.lastPage ? false : pages.page + 1
    },
    refetchOnWindowFocus: false,
    retry: false,
  })

  let UnreadNotificationsPages: Notification[][] = []

  if (notificationPages) {
    UnreadNotificationsPages = notificationPages.pages.map(
      ({ data: notifications }) =>
        notifications.filter((notifications) => !notifications.readAt),
    )
  }

  async function handleReadNotification(notification: Notification) {
    const notificationIsRead = !!notification.readAt

    if (notificationIsRead) {
      return router.push(`${notification.linkTo}`)
    }

    await readNotification(notification.id)
    router.push(`${notification.linkTo}`)
  }
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <Card>
      <Tabs defaultValue="all" className="mt-2">
        <CardHeader>
          <TabsList className="mr-auto">
            <TabsTrigger value="all" disabled={notificationsPagesIsLoading}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="not-read"
              disabled={notificationsPagesIsLoading}
            >
              Not read
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <TabsContent value="all">
            {notificationsPagesIsLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <NotificationCardSkeleton key={index} />
                ))
              : notificationPages &&
                notificationPages.pages.map(({ data }) => (
                  <>
                    {data.map((notification) => {
                      const notificationIsRead = !!notification.readAt

                      return (
                        <div key={notification.id}>
                          <a
                            onClick={() => handleReadNotification(notification)}
                            className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent"
                          >
                            <div className="overflow-hidden rounded-full">
                              <Avatar className="h-14 w-14">
                                <AvatarImage
                                  src={notification.avatarFrom}
                                  alt=""
                                />
                              </Avatar>
                            </div>
                            <div className="space-y-1">
                              <Markdown className="max-h-24 overflow-hidden text-sm leading-relaxed">
                                {notification.title}
                              </Markdown>
                              <time className="text-xs text-muted-foreground">
                                {dayjs(notification.createdAt).fromNow()}
                              </time>
                            </div>

                            {!notificationIsRead && (
                              <span className="absolute right-5 top-1/2 flex h-3 w-3 -translate-y-1/2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
                              </span>
                            )}
                          </a>
                        </div>
                      )
                    })}
                  </>
                ))}
          </TabsContent>

          <TabsContent value="not-read">
            {UnreadNotificationsPages.map((notifications) => (
              <>
                {notifications.map((notification) => {
                  const notificationIsRead = !!notification.readAt

                  return (
                    <div key={notification.id}>
                      <a
                        onClick={() => handleReadNotification(notification)}
                        className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent"
                      >
                        <div className="overflow-hidden rounded-full">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={notification.avatarFrom} alt="" />
                          </Avatar>
                        </div>
                        <div className="space-y-1">
                          <Markdown className="max-h-24 overflow-hidden text-sm leading-relaxed">
                            {notification.title}
                          </Markdown>
                          <time className="text-xs text-muted-foreground">
                            {dayjs(notification.createdAt).fromNow()}
                          </time>
                        </div>

                        {!notificationIsRead && (
                          <span className="absolute right-5 top-1/2 flex h-3 w-3 -translate-y-1/2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
                          </span>
                        )}
                      </a>
                    </div>
                  )
                })}
              </>
            ))}
          </TabsContent>
        </CardContent>
      </Tabs>

      {isFetchingNextPage && (
        <div className="mb-5 flex w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <span className="invisible" ref={ref} />
    </Card>
  )
}
