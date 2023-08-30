import Link from 'next/link'
import { Logo } from './logo'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { BellIcon } from '@radix-ui/react-icons'
import { UserNav } from './user-nav'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo className="h-8 w-8" />
        </Link>

        <Separator orientation="vertical" className="h-5" />

        <nav className="flex items-center space-x-6">
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/forum">Forum</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Feedback
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <Button
          variant="outline"
          className="h-6 gap-1 rounded-full px-2 text-secondary-foreground"
          size="sm"
        >
          <BellIcon className="h-3 w-3" />
          <span>12</span>
        </Button>

        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserNav />
        </Suspense>
      </div>
    </div>
  )
}
