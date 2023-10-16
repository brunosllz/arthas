/* eslint-disable jsx-a11y/alt-text */

import Link from 'next/link'
import { Button } from './ui/button'

import { Github, Instagram, Linkedin } from 'lucide-react'

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
                <Link
                  href="/"
                  className="leading-none text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="leading-none text-muted-foreground hover:text-foreground"
                >
                  Projetos
                </Link>
                <Link
                  href="/me"
                  className="leading-none text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
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
        <div className="flex py-4">
          <span className="text-sm text-zinc-500">
            © {new Date().getFullYear()} DevXperience. Todos os direitos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
