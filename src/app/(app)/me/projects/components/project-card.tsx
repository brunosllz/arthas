import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ProjectStatusPin } from './project-status-pin'
import { MessagesSquare, User } from 'lucide-react'

interface ProjectCardProps {
  status: 'recruiting' | 'draft' | 'closed'
  name: string
  technologies: string[]
  description: string
}

export function ProjectCard({
  description,
  name,
  status,
  technologies,
}: ProjectCardProps) {
  return (
    <Card className="cursor-pointer transition-colors hover:border-card-foreground hover:ring-4 hover:ring-card-foreground/5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-20 w-20 rounded-full bg-zinc-700">
          {status !== 'draft' && <ProjectStatusPin status={status} />}
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-medium">{name}</h2>

          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="flex rounded-sm bg-secondary px-1.5 py-0.5"
              >
                <span className="text-xs leading-5">{technology}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>

      <CardContent>
        <p>{description}</p>
      </CardContent>

      <CardFooter className="space-x-3">
        <div className="flex items-center gap-1">
          <User size={16} className="text-cyan-400" />{' '}
          <span className="text-xs">02</span>
        </div>
        <div className="flex items-center gap-1">
          <MessagesSquare size={16} className="text-green-400" />{' '}
          <span className="text-xs">02</span>
        </div>
      </CardFooter>
    </Card>
  )
}
