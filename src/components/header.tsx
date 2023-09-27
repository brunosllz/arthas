import Link from 'next/link'
import { Logo } from './logo'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { UserNav } from './user-nav'
import { NavLink } from './nav-link'
import { NotificationPanel } from './notification-panel'

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
          <NavLink href="/discussions">Discussions</NavLink>
          <NavLink href="/messages">Messages</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Feedback
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <NotificationPanel />

        <UserNav />
      </div>
    </div>
  )
}
