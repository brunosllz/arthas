import { BellIcon, GearIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { UserAvatar } from './user-avatar'

export async function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative h-6 gap-1 rounded-full px-2 text-secondary-foreground"
          size="sm"
        >
          <BellIcon className="h-3 w-3" />
          <span>03</span>

          <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
        </Button>
      </PopoverTrigger>

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
          <div className="flex items-start gap-4">
            <div className="overflow-hidden rounded-full">
              <UserAvatar className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                New message of <strong>Bruno Luiz</strong>.
              </p>
              <time className="text-xs text-muted-foreground">
                15 minutes ago
              </time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="overflow-hidden rounded-full">
              <UserAvatar className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                New answer in <strong>Dev Xperince</strong> of{' '}
                <strong>Bruno Luiz</strong>.
              </p>
              <time className="text-xs text-muted-foreground">
                15 minutes ago
              </time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="overflow-hidden rounded-full">
              <UserAvatar className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                <strong>Bruno Luiz</strong> comment in your answer.
              </p>
              <time className="text-xs text-muted-foreground">
                15 minutes ago
              </time>
            </div>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href="/notifications">See all</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
