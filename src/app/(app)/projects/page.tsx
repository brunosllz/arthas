import { env } from '@/env'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { NavLink } from '@/components/nav-link'

import { Calendar, Timer, Github, Linkedin, Instagram } from 'lucide-react'

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

export default function Projects() {
  // const cardRef = useRef<HTMLDivElement | null>(null)
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // useLayoutEffect(() => {
  //   if (cardRef.current) {
  //     setDimensions({
  //       width: cardRef.current.offsetWidth,
  //       height: cardRef.current.offsetHeight,
  //     })
  //   }
  // }, [])

  // grid grid-cols-[minmax(18.75rem,25rem)_1fr] gap-6
  return (
    <div className="space-y-6 page-container">
      <Card className="overflow-hidden">
        <div className="relative h-36 w-full bg-zinc-900">
          <Avatar className="h-full w-full rounded-none">
            {/* <AvatarImage src="/background-profile.png" /> */}
            {/* <AvatarFallback /> */}
          </Avatar>

          <div className="absolute -bottom-[44px] left-6">
            <Avatar size="xl" className="bg-zinc-800 ring-2 ring-black">
              {/* <AvatarImage src="https://github.com/brunosllz.png" /> */}
              {/* <AvatarFallback className="" /> */}
            </Avatar>
          </div>
        </div>

        <CardContent className="mt-[68px] space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <strong className="block text-2xl font-semibold">
                Website E-commerce
              </strong>

              <div className="inline-flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="block text-zinc-200">
                    Bruno Silveira Luiz
                  </span>

                  <span className="text-lg text-zinc-900">•</span>

                  <span className="block text-muted-foreground">
                    Full Stack
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Postado há 14 horas.
                </span>
              </div>
            </div>

            <div className="space-y-3 pb-2">
              <span className="text-zinc-200">Disponibilidade</span>

              <div className="space-x-4">
                <span className="inline-flex gap-2 text-sm text-muted-foreground/90">
                  <Calendar size={16} />
                  Segunda, Quarta e Sexta
                </span>

                <span className="inline-flex gap-2 text-sm text-muted-foreground/90">
                  <Timer size={16} />
                  2hs
                </span>
              </div>
            </div>

            <Button size="lg">Quero participar!</Button>
          </div>

          <Separator className="bg-zinc-900" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-zinc-200">
              Descrição do projeto
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              Estamos criando uma plataforma de compras online sensacional e
              precisamos de pessoas apaixonadas para nos ajudar. Imagine
              reinventar a maneira como as pessoas compram na internet e fazer
              parte dessa revolução. Vem com a gente e faça parte desse projeto
              incrível!
            </p>

            <div className="space-x-3">
              <Badge variant="static">JavaScript</Badge>
              <Badge variant="static">React</Badge>
              <Badge variant="static">Node.js</Badge>
              <Badge variant="static">Php</Badge>
            </div>
          </div>

          <Separator className="bg-zinc-900" />

          <div className="space-x-4">
            <Button size="lg">2 - Back-end</Button>
            <Button variant="outline" size="lg">
              2 - Front-end
            </Button>
            <Button size="lg" variant="outline" disabled>
              1 - UX/UI Designer
            </Button>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-200">
              Informações
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Estamos em busca de um Desenvolvedor Front-end altamente motivado
              e talentoso para se juntar à nossa equipe de e-commerce em
              crescimento. Você desempenhará um papel fundamental na criação de
              uma experiência de compra online excepcional, trabalhando em
              estreita colaboração com nossa equipe de design e desenvolvimento.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-200">
              Responsabilidades
            </h3>
            <div className="inline-flex items-start gap-2">
              <span className="text-end">•</span>

              <p className="leading-relaxed text-muted-foreground">
                Colaborar com a equipe de design para transformar conceitos em
                interfaces de usuário atraentes e funcionais.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-200">
              Requisitos
            </h3>
            <div className="inline-flex items-start gap-2">
              <span className="text-end">•</span>

              <p className="leading-relaxed text-muted-foreground">
                HTML, CSS e JavaScript: Experiência sólida em codificação e
                manipulação de HTML, CSS e JavaScript para criar interfaces de
                usuário atraentes e interativas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}
