/* eslint-disable jsx-a11y/alt-text */
import { env } from '@/env'

import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Instagram, Linkedin, Github } from 'lucide-react'

const navLinkItems = [
  {
    title: 'Home',
    href: '/',
    disabled: env.FEATURE_HOME_PAGE === 0,
  },
  {
    title: 'Projetos',
    href: '/projects',
    disabled: false,
  },
  {
    title: 'Discussões',
    href: '/discussions',
    disabled: env.FEATURE_DISCUSSIONS_PAGE === 0,
  },
]

export function Footer() {
  return (
    <footer className="flex flex-col space-y-8 rounded-md border px-6 pb-8 pt-12">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="max-w-[312px] space-y-4">
            <img src="/logo.svg" />
          </div>

          <div className="space-x-4">
            <Button
              variant="outline"
              className="relative h-[42px] w-[42px] rounded-full px-3 text-secondary-foreground"
              size="sm"
              asChild
            >
              <a href="https://github.com" target="_blank">
                <Instagram size={18} />
              </a>
            </Button>

            <Button
              variant="outline"
              className="relative h-[42px] w-[42px] rounded-full px-3 text-secondary-foreground"
              size="sm"
              asChild
            >
              <a href="https://github.com" target="_blank">
                <Linkedin size={18} />
              </a>
            </Button>

            <Button
              variant="outline"
              className="relative h-[42px] w-[42px] rounded-full px-3 text-secondary-foreground"
              size="sm"
              asChild
            >
              <a href="https://github.com" target="_blank">
                <Github size={18} />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {navLinkItems.map((navItem) => (
            <NavLink
              key={navItem.title}
              href={navItem.href}
              disabled={navItem.disabled}
            >
              {navItem.title}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="leading-none text-muted-foreground hover:text-foreground"
          >
            A Dev Xperience
          </a>
          <a
            href="/"
            className="leading-none text-muted-foreground hover:text-foreground"
          >
            Diretrizes da comunidade
          </a>
          <a
            href="/"
            className="leading-none text-muted-foreground hover:text-foreground"
          >
            Termos de uso
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="leading-none text-muted-foreground hover:text-foreground"
          >
            Comunidade
          </a>
          <a
            href="/"
            className="leading-none text-muted-foreground hover:text-foreground"
          >
            Central de ajuda
          </a>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-center">
        <span className="text-sm text-zinc-500">
          © {new Date().getFullYear()} DevXperience. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  )
}
