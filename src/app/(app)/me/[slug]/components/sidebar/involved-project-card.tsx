import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type InvolvedProjectCardProps = {
  project: {
    id: string
    image_url: string
    name: string
    status: 'inProgress' | 'recruiting' | 'closed'
  }
}

const projectStatus = {
  inProgress: 'Em andamento',
  recruiting: 'Recrutando',
  closed: 'Encerrado',
}

export function InvolvedProjectCard({ project }: InvolvedProjectCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Avatar size="xs" variant="square">
          <AvatarImage src={project.image_url} />
          <AvatarFallback />
        </Avatar>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <strong className="line-clamp-1 font-semibold">
              {project.name}
            </strong>
            <Badge size="sm" variant={project.status}>
              {projectStatus[project.status]}
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
