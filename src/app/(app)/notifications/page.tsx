import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { UserAvatar } from '@/components/user-avatar'
import { NotificationList } from './components/notification-list'

export default function Notifications() {
  return (
    <div className="mx-auto max-w-[680px]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Notifications</h1>
        </div>
      </div>

      <Separator className="mb-8 mt-4" />

      <NotificationList />

      {/* <Card>
        <Tabs defaultValue="all" className="mt-2">
          <CardHeader>
            <TabsList className="mr-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="not-read">Not read</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="all">
              <div>
                <a
                  href="#"
                  className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent"
                >
                  <div className="overflow-hidden rounded-full">
                    <UserAvatar className="h-14 w-14" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm leading-relaxed">
                      <strong>Bruno Luiz</strong> comment in your answer.
                    </p>
                    <time className="text-xs text-muted-foreground">
                      15 minutes ago
                    </time>
                  </div>

                  <span className="absolute right-5 top-1/2 flex h-3 w-3 -translate-y-1/2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
                  </span>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent"
                >
                  <div className="overflow-hidden rounded-full">
                    <UserAvatar className="h-14 w-14" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm leading-relaxed">
                      <strong>Bruno Luiz</strong> comment in your answer.
                    </p>
                    <time className="text-xs text-muted-foreground">
                      15 minutes ago
                    </time>
                  </div>
                </a>
              </div>

              <div className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                <div className="overflow-hidden rounded-full">
                  <UserAvatar className="h-14 w-14" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-relaxed">
                    <strong>Bruno Luiz</strong> comment in your answer.
                  </p>
                  <time className="text-xs text-muted-foreground">
                    15 minutes ago
                  </time>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="not-read">
              <div className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                <div className="overflow-hidden rounded-full">
                  <UserAvatar className="h-14 w-14" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-relaxed">
                    <strong>Bruno Luiz</strong> comment in your answer.
                  </p>
                  <time className="text-xs text-muted-foreground">
                    15 minutes ago
                  </time>
                </div>

                <span className="absolute right-5 top-1/2 flex h-3 w-3 -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
                </span>
              </div>

              <div className="relative flex cursor-pointer items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                <div className="overflow-hidden rounded-full">
                  <UserAvatar className="h-14 w-14" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-relaxed">
                    <strong>Bruno Luiz</strong> comment in your answer.
                  </p>
                  <time className="text-xs text-muted-foreground">
                    15 minutes ago
                  </time>
                </div>

                <span className="absolute right-5 top-1/2 flex h-3 w-3 -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
                </span>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card> */}
    </div>
  )
}
