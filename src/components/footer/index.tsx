/* eslint-disable jsx-a11y/alt-text */

import { Button } from '../ui/button'
import { env } from '@/env'

import { NavLink } from '../nav-link'
import { BackToTopButton } from './back-to-top-button'

import { Github, Instagram, Linkedin } from 'lucide-react'

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
    <footer className="flex flex-col border-t border-border">
      <div className="wrapper">
        <div className="mt-4 flex items-start justify-between border-b border-border py-8 ">
          <div className="space-y-8">
            <div className="max-w-[312px] space-y-4">
              <img src="/logo.svg" />
              <p className="leading-tight text-muted-foreground">
                Conectando mentes criativas, moldando o amanhã, um projeto de
                cada vez.
              </p>
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

          <div className="flex max-w-[556px] gap-[72px]">
            <div className="flex flex-col">
              <span className="text-lg font-medium leading-none">
                Plataforma
              </span>

              <div className="mt-4 flex flex-col gap-3">
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
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium leading-none">Sobre</span>

              <div className="mt-4 flex flex-col gap-3">
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
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium leading-none">Dúvida</span>

              <div className="mt-4 flex flex-col gap-3">
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
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-zinc-500">
            © {new Date().getFullYear()} DevXperience. Todos os direitos
            reservados.
          </span>

          <BackToTopButton />
        </div>
      </div>
    </footer>
  )
}
