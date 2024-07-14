import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PROJECT_STATUS } from '@/mappers/project-status'

type InvolvedProjectCardProps = {
  project: {
    id: string
    imageUrl: string | null
    name: string
    status: 'inProgress' | 'recruiting' | 'closed'
  }
}

export function InvolvedProjectCard({ project }: InvolvedProjectCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Avatar size="xs" variant="square">
          {project.imageUrl && <AvatarImage src={project.imageUrl} />}
          <AvatarFallback />
        </Avatar>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <strong className="line-clamp-1 font-semibold">
              {project.name}
            </strong>
            <Badge size="sm" variant={PROJECT_STATUS[project.status].color}>
              {PROJECT_STATUS[project.status].label}
            </Badge>
          </div>

          <span className="block text-sm text-muted-foreground">
            <span className="text-accent-foreground">Bruno Silveira</span>, João
            Lucas, José Luiz, Pedro Henrique.
          </span>
        </div>
      </div>
    </div>
  )
}
