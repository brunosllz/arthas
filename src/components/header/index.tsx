/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { UserNav } from '../user-nav'
import { NavLink } from '../nav-link'
import { NotificationPanel } from '../notification-panel'
import { MessageCircle } from 'lucide-react'
import { SearchBar } from './search-bar'
import { env } from '@/env'

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
    <header className="fixed z-50 flex w-full border-b border-border bg-opacity-30 py-6 saturate-150 backdrop-blur-lg">
      <div className="wrapper">
        <div className="flex items-center justify-between">
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

          {env.FEATURE_SEARCH_BAR === 1 && <SearchBar />}

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="relative h-[42px] w-[42px] rounded-full bg-background px-3 text-secondary-foreground"
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
      </div>
    </header>
  )
}
