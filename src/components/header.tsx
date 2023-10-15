/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { UserNav } from './user-nav'
import { NavLink } from './nav-link'
import { NotificationPanel } from './notification-panel'
import { MessageCircle } from 'lucide-react'

const navLinkItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Projetos',
    href: '/projects',
  },
  {
    title: 'Discussões',
    href: '/discussions',
  },
]

export function Header() {
  return (
    <header className="flex border-b border-border py-6">
      <div className="max-w-wrapper mx-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-20">
          <Link href="/">
            <img src="/logo.svg" />
          </Link>

          <nav className="flex items-center space-x-8">
            {navLinkItems.map((navItems) => (
              <NavLink key={navItems.title} href={navItems.href}>
                {navItems.title}
              </NavLink>
            ))}
          </nav>
        </div>

        <input
          type="text"
          placeholder="Realizar busca"
          className="h-12 w-[413px] max-w-full rounded-md border border-input bg-transparent px-4 py-4 text-sm placeholder:text-border"
        />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="relative h-[42px] w-[42px] rounded-full px-3 text-secondary-foreground"
              size="sm"
            >
              <MessageCircle size={18} />
            </Button>

            <NotificationPanel />
          </div>

          <Separator orientation="vertical" className="h-9" />

          <UserNav />
        </div>
      </div>
    </header>
  )
}
