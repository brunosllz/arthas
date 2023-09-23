'use client'

import { useQuery } from '@tanstack/react-query'
import { ProjectCard } from './project-card'
import { externalApi } from '@/libs/axios'
import { ProjectListCardSkeleton } from './project-card-skeleton'
import { EmptyProjects } from './empty-projects'

type Project = {
  id: string
  authorId: string
  name: string
  description: string
  excerpt: string
  status: string
  imageUrl: string
  slug: string
  createdAt: string
  updatedAt: string
  technologies: Array<string>
  _count: {
    teamMembers: number
    answers: number
  }
}

export function ProjectList() {
  const { data: projects, isLoading: projectsIsLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data: response } = await externalApi.get('projects/me')
      return response.projects
    },
    refetchOnWindowFocus: false,
    retry: false,
  })

  const hasProjects = projects?.length

  return (
    <ul
      data-has-projects={!hasProjects && !projectsIsLoading}
      className="grid grid-cols-3 gap-6 data-[has-projects=true]:flex data-[has-projects=true]:flex-col"
    >
      {projectsIsLoading ? (
        <ProjectListCardSkeleton />
      ) : hasProjects ? (
        <>
          {projects?.map((project) => (
            <ProjectCard
              imageUrl={project.imageUrl}
              key={project.id}
              name={project.name}
              description={project.excerpt}
              slug={project.slug}
              countAnswers={project._count.answers}
              countTeamMembers={project._count.teamMembers}
              status={project.status as 'recruiting' | 'draft' | 'closed'}
              technologies={project.technologies}
            />
          ))}
        </>
      ) : (
        <EmptyProjects />
      )}
    </ul>
  )
}
