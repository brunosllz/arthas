import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ProjectShortDetails } from './projects-list'
import dayjs from 'dayjs'

import { useBoundStore } from '@/store'

import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

type ProjectCardProps = {
  project: ProjectShortDetails
}

export function ProjectCard({ project }: ProjectCardProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleSelectProject(projectId: string) {
    const params = new URLSearchParams(searchParams)

    params.set('currentProjectId', projectId)
    useBoundStore.setState({ currentSelectedProjectId: projectId })

    router.replace(`${pathname}?${params.toString()}`)
  }

  const isSelected =
    useBoundStore.getState().currentSelectedProjectId === project.id

  return (
    <Card
      data-is-selected={isSelected}
      className="relative cursor-pointer transition-colors data-[is-selected=true]:border-zinc-600 hover:border-zinc-600"
      onClick={() => handleSelectProject(project.id)}
    >
      <CardHeader className="flex-row items-start gap-3 space-y-0 p-5 pb-4">
        <Avatar
          size="xs"
          variant="square"
          className="bg-zinc-800 ring-1 ring-zinc-700"
        >
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={42}
              height={42}
            />
          ) : (
            <Skeleton className="h-[42px] w-[42px]" />
          )}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-1">
            <a
              className="pointer-events-none line-clamp-1 flex-1 touch-manipulation select-none font-semibold"
              href={project.id}
            >
              {project.name}
            </a>
            <span className="text-xs text-muted-foreground">
              {dayjs(project.createdAt).fromNow()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sm text-zinc-200">{project.author.name}</span>

            <span className="text-lg leading-none text-zinc-900">•</span>

            <span className="text-sm text-muted-foreground">
              {project.author.role}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5">
        <p className="line-clamp-3 text-sm">{project.description}</p>

        <div className="flex items-center gap-2 border-t pt-4 ">
          {project.skills.map((skill) => (
            <Badge key={skill} size="sm" variant="static">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      {isSelected && (
        <div className="absolute -left-1 top-1/2 h-20 w-2 -translate-y-1/2 rounded-full bg-zinc-600" />
      )}
    </Card>
  )
}
