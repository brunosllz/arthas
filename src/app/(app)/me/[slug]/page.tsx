import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { AvatarGroupAnimated } from './components/avatar-group-animated'
import { AvatarGroup } from '@/components/avatar-group'

export default function Me() {
  return (
    <div className="grid grid-cols-[1fr_minmax(18.75rem,25rem)] gap-6 page-container">
      <div>
        <Card className="overflow-hidden ">
          <div className="relative h-36 w-full bg-zinc-900">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src="/background-profile.png" />
              <AvatarFallback />
            </Avatar>

            <div className="absolute -bottom-[44px] left-6">
              <Avatar size="xl" className="ring-2 ring-black">
                <AvatarImage src="https://www.github.com/brunosllz.png" />
                <AvatarFallback />
              </Avatar>
            </div>
          </div>

          <CardContent className="mt-[68px] space-y-8">
            <div className="flex items-start justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <strong className="text-3xl font-semibold">
                    Bruno Silveira Luiz
                  </strong>

                  <span className="block text-lg text-muted-foreground">
                    Ceo e Founder da{' '}
                    <span className="font-medium text-zinc-50">
                      Dev Xperience
                    </span>
                  </span>

                  <div className="space-x-3 pt-2">
                    <Badge variant="static" size="lg">
                      Dev Front-end
                    </Badge>
                    <Badge variant="static" size="lg">
                      Pleno
                    </Badge>
                  </div>
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-light text-zinc-500">
                  <MapPin size={14} />
                  Bento Gonçalves, RS, Brasil
                </span>
              </div>

              <div className="space-x-3">
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

            <Separator className="bg-zinc-900" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-200">
                Atuou em 12 projetos
              </span>

              <span className="inline-flex items-center gap-1.5 text-sm">
                <Star size={16} className="fill-yellow-500" strokeWidth={0} />
                5.0
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-[1.375rem]">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <h3 className="text-xl font-medium">Sobre</h3>
            <MoreHorizontal size={20} className="text-muted-foreground" />
          </CardHeader>

          <CardContent className="space-y-12">
            <p className="leading-relaxed text-muted-foreground">
              Desenvolvedor de Software apaixonado por criar soluções inovadoras
              e eficientes. Com experiência em desenvolvimento web, mobile,
              linguagens de programação, busco desafios que me permitam
              aprimorar minhas habilidades e contribuir para projetos de
              sucesso.
            </p>

            <div className="space-x-3">
              <Badge variant="static">JavaScript</Badge>
              <Badge variant="static">React</Badge>
              <Badge variant="static">Node.js</Badge>
              <Badge variant="static">Php</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-[1.625rem]">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <h3 className="text-xl font-medium">Projetos realizados</h3>
            <MoreHorizontal size={20} className="text-muted-foreground" />
          </CardHeader>

          <CardContent className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <div key={i} className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Avatar size="sm" variant="square">
                      <AvatarImage src="https://www.github.com/diego3g.png" />
                      <AvatarFallback />
                    </Avatar>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <strong className="text-lg font-medium">
                          Website E-commerce
                        </strong>
                        <Badge variant="outline">Dev Front-end</Badge>
                      </div>

                      <p className="font-light leading-relaxed text-muted-foreground">
                        Em um projeto de e-commerce, fui o desenvolvedor
                        front-end, traduzindo designs em código e tornando o
                        site atrativo e funcional. Colaborei com a equipe de
                        back-end para integração, otimização e melhorias na
                        responsividade da experiência do usuário.
                      </p>

                      <div className="flex items-end justify-between pt-1">
                        <AvatarGroupAnimated />

                        <div className="space-x-6">
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <Star
                              size={16}
                              className="fill-yellow-500"
                              strokeWidth={0}
                            />
                            5.0
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MessageCircle size={16} /> 3 comentários
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {i < 3 - 1 && <Separator className="bg-zinc-900" />}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <h3 className="text-sm font-medium">Projetos envolvido</h3>
            <MoreHorizontal size={20} className="text-muted-foreground" />
          </CardHeader>

          <CardContent className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <div key={i} className="space-y-6">
                  <div className="flex gap-3">
                    <Avatar size="xs" variant="square">
                      <AvatarImage src="https://www.github.com/diego3g.png" />
                      <AvatarFallback />
                    </Avatar>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <strong className="font-semibold">
                          Website E-commerce
                        </strong>
                        <Badge size="sm">Em andamento</Badge>
                      </div>

                      <span className="block text-sm text-muted-foreground">
                        <span className="text-accent-foreground">
                          Bruno Silveira
                        </span>
                        , João Lucas, José Luiz, Pedro Henrique.
                      </span>
                    </div>
                  </div>

                  {i < 3 - 1 && <Separator />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="sticky top-[7.5rem]">
          <CardHeader className="p-5">
            <AvatarGroup />
          </CardHeader>

          <CardContent className="space-y-2 px-5">
            <p className="text-lg font-medium leading-tight ">
              Projetos sem equipe? Vamos ajudar você a montar a sua!
            </p>

            <p className="leading-tight text-muted-foreground">
              Monte uma equipe para concretizar seus projetos. A colaboração
              leva ao sucesso.
            </p>
          </CardContent>

          <CardFooter className="p-5 pt-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/me/projects">Criar projeto</Link>
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  )
}
