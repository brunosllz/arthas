import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ProjectStatusPin } from './project-status-pin'
import { MessagesSquare, User } from 'lucide-react'
import Markdown from 'react-markdown'

interface ProjectCardProps {
  status: 'recruiting' | 'draft' | 'closed'
  name: string
  imageUrl: string
  technologies: string[]
  description: string
  countAnswers: number
  countTeamMembers: number
  slug: string
}

export function ProjectCard({
  description,
  name,
  status,
  imageUrl,
  technologies,
  countAnswers,
  countTeamMembers,
  slug,
}: ProjectCardProps) {
  return (
    <Card className="cursor-pointer transition-colors hover:border-card-foreground hover:ring-4 hover:ring-card-foreground/5">
      <a href={`/me/project/${slug}`}>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-zinc-700">
              {imageUrl && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={imageUrl} className="h-full w-full bg-cover" />
              )}
            </div>

            {status !== 'draft' && <ProjectStatusPin status={status} />}
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <h2 className="truncate text-xl font-medium">{name}</h2>

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
          <Markdown className="max-h-24 overflow-hidden text-sm leading-relaxed">
            {description}
          </Markdown>
        </CardContent>

        <CardFooter className="space-x-3">
          <div className="flex items-center gap-1">
            <User size={16} className="text-cyan-400" />{' '}
            <span className="text-xs">{countTeamMembers}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessagesSquare size={16} className="text-green-400" />{' '}
            <span className="text-xs">{countAnswers}</span>
          </div>
        </CardFooter>
      </a>
    </Card>
  )
}
