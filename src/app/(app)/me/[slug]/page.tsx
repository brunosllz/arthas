import lazy from 'next/dynamic'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AvatarGroupAnimated } from './components/avatar-group-animated'

import {
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
  Pen,
  Plus,
  Star,
} from 'lucide-react'
import { MarkdownWrapper } from '@/components/markdown'
import { getCurrentServerSession } from '@/actions/get-current-user'
import { DialogTrigger } from '@/components/ui/dialog'
import { EditAboutSection } from './components/edit-about-section'
import { SideBar } from './components/sidebar'
import { getUserProfile } from '@/actions/get-user-profile'
import { redirect } from 'next/navigation'
import { getRolesAndSenioritiesItensFromCms } from '@/actions/get-roles-and-seniorities-itens-from-cms'

const EditProfileSection = lazy(async () => {
  const { EditProfileSection } = await import(
    './components/edit-profile-section'
  )

  return { default: EditProfileSection }
})

interface MeProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: MeProps) {
  const { user } = await getUserProfile({ slug: params.slug })

  return {
    title: user?.name,
  }
}

export default async function Me({ params }: MeProps) {
  const { user } = await getUserProfile({ slug: params.slug })

  if (!user) {
    return redirect('/')
  }

  const session = await getCurrentServerSession()
  const { roles, seniorities } = await getRolesAndSenioritiesItensFromCms()

  const isCurrentUser = session?.user?.uId === user.id

  return (
    <div className="grid grid-cols-[1fr_minmax(18.75rem,25rem)] gap-6 page-container">
      <div>
        <Card className="overflow-hidden ">
          <div className="relative h-36 w-full bg-zinc-900">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src="/background-profile.png" />
              <AvatarFallback />
            </Avatar>

            {isCurrentUser && (
              <div className="absolute right-3 top-3">
                <Button size="icon-sm" variant="ghost" className="rounded-full">
                  <Pen size={16} className="text-muted-foreground" />
                </Button>
              </div>
            )}

            <div className="absolute -bottom-[44px] left-6">
              <Avatar size="xl" className="ring-2 ring-black">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback />
              </Avatar>
            </div>
          </div>

          <CardContent className="mt-[68px] space-y-8">
            <div className="flex items-start justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <strong className="text-3xl font-semibold">
                    {user.name}
                  </strong>

                  <span className="block text-lg text-muted-foreground">
                    {user.title}
                  </span>

                  <div className="space-x-3 pt-2">
                    <Badge variant="static" size="lg">
                      {roles.find((role) => role.value === user.role)?.label}
                    </Badge>
                    <Badge variant="static" size="lg">
                      {
                        seniorities.find(
                          (seniority) => seniority.value === user.seniority,
                        )?.label
                      }
                    </Badge>
                  </div>
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-light text-zinc-500">
                  <MapPin size={14} />
                  {user.city}, {user.state}, {user.country}
                </span>
              </div>

              <div className="space-x-3">
                {user.linkedinLink && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={user.linkedinLink} target="_blank">
                      <Linkedin size={18} />
                    </a>
                  </Button>
                )}

                {user.githubLink && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={user.githubLink} target="_blank">
                      <Github size={18} />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <Separator className="bg-zinc-900" />

            {isCurrentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Star
                      size={16}
                      className="fill-yellow-500"
                      strokeWidth={0}
                    />
                    {user.overallRate}
                  </span>

                  <Separator orientation="vertical" className="h-[18px] w-px" />

                  <span className="text-sm text-zinc-200">
                    {`Atuou em ${
                      user.projectRealized.length === 1
                        ? `${user.projectRealized.length} projeto`
                        : `${user.projectRealized.length} projetos`
                    }`}
                  </span>
                </div>

                <EditProfileSection
                  user={{
                    country: user.country,
                    slugProfile: user.slugProfile,
                    city: user.city,
                    githubLink: user.githubLink,
                    linkedinLink: user.linkedinLink,
                    name: user.name,
                    role: user.role,
                    seniority: user.seniority,
                    state: user.state,
                    title: user.title,
                    updatedAt: user.updatedAt,
                  }}
                  selectOptions={{
                    roles,
                    seniorities,
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Editar perfil
                    </Button>
                  </DialogTrigger>
                </EditProfileSection>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-200">
                  {`Atuou em ${
                    user.projectRealized.length === 1
                      ? `${user.projectRealized.length} projeto`
                      : `${user.projectRealized.length} projetos`
                  }`}
                </span>
                {user.projectRealized.length !== 0 && (
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Star
                      size={16}
                      className="fill-yellow-500"
                      strokeWidth={0}
                    />
                    {user.overallRate}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {(user.skills.length > 0 || user.aboutMe || isCurrentUser) && (
          <Card className="mt-[1.375rem]">
            {(user.aboutMe || isCurrentUser) && (
              <CardHeader className="flex-row items-center justify-between pb-4">
                <h3 className="text-xl font-medium">Sobre</h3>

                {isCurrentUser && (
                  <EditAboutSection
                    user={{
                      aboutMe: user.aboutMe ?? '',
                      skills: user.skills,
                      slugProfile: user.slugProfile,
                      updatedAt: user.updatedAt,
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <Pen size={16} className="text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                  </EditAboutSection>
                )}
              </CardHeader>
            )}

            <CardContent
              data-has-about-me-section={
                !!user.aboutMe || (isCurrentUser && !user.aboutMe)
              }
              className="space-y-6 data-[has-about-me-section=false]:pt-6"
            >
              {user.aboutMe ? (
                <MarkdownWrapper>{user.aboutMe}</MarkdownWrapper>
              ) : isCurrentUser && !user.aboutMe ? (
                <div className="space-y-6">
                  <span className="block font-light text-muted-foreground">
                    Adicione informações sobre você e aumente suas chances de
                    ser aceito para estar fazendo parte de projetos incriveis.
                  </span>

                  {user.skills.length === 0 && (
                    <EditAboutSection
                      user={{
                        aboutMe: user.aboutMe ?? '',
                        skills: user.skills,
                        slugProfile: user.slugProfile,
                        updatedAt: user.updatedAt,
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button>Adicionar informações</Button>
                      </DialogTrigger>
                    </EditAboutSection>
                  )}
                </div>
              ) : null}

              {user.skills.length > 0 && (
                <>
                  {user.aboutMe && <Separator />}

                  <div className="space-y-4">
                    <strong className="text-lg font-medium">Habilidades</strong>

                    <div className="flex flex-wrap items-center gap-3">
                      {user.skills.map((skill) => (
                        <Badge key={skill} variant="static">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {user.projectRealized.length > 0 ||
          (isCurrentUser && (
            <Card className="mt-[1.625rem]">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <h3 className="text-xl font-medium">Projetos realizados</h3>

                {isCurrentUser && user.projectRealized.length > 0 && (
                  <Plus size={22} className="text-muted-foreground" />
                )}
              </CardHeader>

              <CardContent className="space-y-8">
                {user.projectRealized.length ? (
                  <>
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
                                front-end, traduzindo designs em código e
                                tornando o site atrativo e funcional. Colaborei
                                com a equipe de back-end para integração,
                                otimização e melhorias na responsividade da
                                experiência do usuário.
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
                  </>
                ) : (
                  <div className="space-y-6">
                    <span className="block font-light text-muted-foreground">
                      Você ainda não possui nenhum projeto realizado
                    </span>
                    <div className="space-x-4">
                      <Button asChild>
                        <Link href="/me/projects">Criar projeto</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/projects">Encontrar projetos</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      <SideBar slugProfile={params.slug} />
    </div>
  )
}
