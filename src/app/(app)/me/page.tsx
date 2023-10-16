import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MapPin, MoreHorizontal, Star } from 'lucide-react'
import Link from 'next/link'

export default function Me() {
  return (
    <main className="grid grid-cols-[1fr_minmax(18.75rem,25rem)] gap-6 py-12">
      <div>
        <Card>
          <div className="relative h-36 w-full bg-zinc-900">
            <div className="absolute -bottom-[44px] left-6">
              <Avatar size="xl" className="ring-2 ring-black">
                <AvatarImage src="https://www.github.com/brunosllz.png" />
                <AvatarFallback />
              </Avatar>
            </div>
          </div>

          <CardContent className="mt-[68px] space-y-8">
            <div className="flex items-start justify-between">
              <div className="space-y-8">
                <div>
                  <strong className="text-3xl font-semibold">
                    Bruno Silveira Luiz
                  </strong>
                  <span className="mt-1.5 block text-lg text-muted-foreground">
                    Ceo e Founder da Dev Xperience
                  </span>
                  <span className="mt-4 inline-flex items-center font-light text-zinc-500">
                    <MapPin size={16} />
                    Juiz de Fora, Minas Gerais, Brasil
                  </span>
                </div>

                <div className="space-x-4">
                  <Button asChild variant="outline">
                    <a
                      href="https://www.linkedin.com/in/bruno-silveira-luiz/"
                      target="_blank"
                    >
                      Linkedin
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://www.github.com/brunosllz" target="_blank">
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-x-3">
                <Badge variant="static" size="lg">
                  Dev Front-end
                </Badge>
                <Badge variant="static" size="lg">
                  Pleno
                </Badge>
              </div>
            </div>

            <Separator className="bg-zinc-900" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
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
          <CardHeader className="pb-4">
            <h3 className="text-xl font-medium">Bio</h3>
          </CardHeader>

          <CardContent className="space-y-12">
            <p className="leading-relaxed text-muted-foreground">
              Desenvolvedor de Software apaixonado por criar soluções inovadoras
              e eficientes. Com experiência em desenvolvimento web, mobile,
              linguagens de programação], busco desafios que me permitam
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
          <CardHeader className="pb-4">
            <h3 className="text-xl font-medium">Projetos realizados</h3>
          </CardHeader>

          <CardContent className="space-y-8">
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
                  Em um projeto de e-commerce, fui o desenvolvedor front-end,
                  traduzindo designs em código e tornando o site atrativo e
                  funcional. Colaborei com a equipe de back-end para integração,
                  otimização e melhorias na responsividade da experiência do
                  usuário.
                </p>

                <div className="flex pt-1">
                  <div></div>
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Star
                      size={16}
                      className="fill-yellow-500"
                      strokeWidth={0}
                    />
                    5.0
                  </span>
                </div>
              </div>
            </div>

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
                  Em um projeto de e-commerce, fui o desenvolvedor front-end,
                  traduzindo designs em código e tornando o site atrativo e
                  funcional. Colaborei com a equipe de back-end para integração,
                  otimização e melhorias na responsividade da experiência do
                  usuário.
                </p>

                <div className="flex pt-1">
                  <div></div>
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Star
                      size={16}
                      className="fill-yellow-500"
                      strokeWidth={0}
                    />
                    5.0
                  </span>
                </div>
              </div>
            </div>
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
            <div className="flex gap-3">
              <Avatar size="xs" variant="square">
                <AvatarImage src="https://www.github.com/diego3g.png" />
                <AvatarFallback />
              </Avatar>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="font-semibold">Website E-commerce</strong>
                  <Badge size="sm">Em andamento</Badge>
                </div>

                <span className="block text-sm text-muted-foreground">
                  Bruno Silveira, João Lucas, José Luiz, Pedro Henrique.
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Avatar size="xs" variant="square">
                <AvatarImage src="https://www.github.com/diego3g.png" />
                <AvatarFallback />
              </Avatar>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="font-semibold">Website E-commerce</strong>
                  <Badge size="sm">Em andamento</Badge>
                </div>

                <span className="block text-sm text-muted-foreground">
                  Bruno Silveira, João Lucas, José Luiz, Pedro Henrique.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sticky top-6">
          <CardHeader className="p-5">
            <Avatar size="xs">
              <AvatarImage src="https://www.github.com/diego3g.png" />
              <AvatarFallback />
            </Avatar>
          </CardHeader>

          <CardContent className="px-5">
            <p className="text-lg font-medium">
              Projetos sem equipe? Vamos ajudar você a montar a sua!
            </p>
            <p className="leading-relaxed text-muted-foreground">
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
    </main>
  )
}
