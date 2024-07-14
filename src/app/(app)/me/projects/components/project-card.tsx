import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { PROJECT_STATUS } from '@/mappers/project-status'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { MarkdownWrapper } from '@/components/markdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ArrowRight } from 'lucide-react'

type ProjectCardProps = {
  description: string
  name: string
  status: 'inProgress' | 'recruiting' | 'closed'
  bannerUrl: string
  myRoles: Array<{ id: string; name: string; slug: string }>
  teamMembers: Array<{ id: string; name: string; avatarUrl: string }>
  slug: string
}

export function ProjectCard({
  description,
  name,
  status,
  bannerUrl,
  myRoles,
  teamMembers,
  slug,
}: ProjectCardProps) {
  return (
    <Card className="group h-full cursor-pointer transition-colors focus-within:border-card-foreground focus-within:ring-4 focus-within:ring-card-foreground/5 hover:border-card-foreground hover:ring-4 hover:ring-card-foreground/5">
      <a
        href={`/me/project/${slug}`}
        className="flex h-full flex-col justify-between outline-none"
      >
        <CardHeader className="flex px-5 pb-0 pt-5">
          <div className="relative flex h-[8.5rem] w-full items-center justify-center overflow-hidden rounded-md bg-zinc-900">
            {bannerUrl && (
              <Image
                src={bannerUrl}
                alt={name}
                className="h-full w-full object-cover"
                width={358}
                height={136}
              />
            )}

            <Badge
              className="absolute left-3 top-3"
              variant={PROJECT_STATUS[status].color}
              size="sm"
            >
              {PROJECT_STATUS[status].label}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {myRoles.map((role) => (
              <Badge key={role.id} variant="secondary" size="sm">
                {role.name}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="m-0 flex-1 space-y-2 p-5">
          <strong className="font-semibold">{name}</strong>

          <MarkdownWrapper className="line-clamp-3 leading-tight">
            {description}
          </MarkdownWrapper>
        </CardContent>

        <CardFooter className="mx-5 flex items-center justify-between border-t px-0 py-5">
          <div className="flex -space-x-4">
            {teamMembers.map((member, index) => {
              return (
                <>
                  {index < 2 && (
                    <Avatar key={member.name} className="ring-1 ring-black">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback />
                    </Avatar>
                  )}
                </>
              )
            })}
            {teamMembers.length > 3 && (
              <div className="-ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-semibold text-white">
                  +{teamMembers.length - 3}
                </span>
              </div>
            )}
          </div>

          <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full border border-input bg-transparent shadow-sm group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowRight
              size={18}
              className="transition-transform group-hover:-rotate-45"
            />
          </div>
        </CardFooter>
      </a>
    </Card>
  )
}
