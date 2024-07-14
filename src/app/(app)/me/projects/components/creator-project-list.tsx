'use client'

import { useQuery } from '@tanstack/react-query'
import { ProjectCard } from './project-card'
import { ProjectListCardSkeleton } from './project-card-skeleton'
import { EmptyProjects } from './empty-projects'
import { externalApi } from '@/libs/fetch-api'
import { MeProjects } from '@/@types/me-projects'
import { PaginationResponseData } from '@/@types/pagination-response-data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// TODO: In the future if we need reduce call to API, we can pass the initial data from the server
// type ProjectListProps = {
//   meProjectsInitialData: MeProjects
// }

export function CreatorProjectList() {
  const { data: meProjects, isLoading: projectsIsLoading } = useQuery<
    PaginationResponseData<MeProjects[]>
  >({
    queryKey: ['me-projects'],
    queryFn: async () => {
      const response = await externalApi('/projects/me')
      const data = await response.json()

      return data
    },
    retry: false,
    // initialData: meProjectsInitialData,
    // staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const hasProjects = meProjects?.data && meProjects.data.length > 0

  return (
    <div className="mt-6 grid grid-cols-3 gap-6">
      {projectsIsLoading ? (
        <ProjectListCardSkeleton />
      ) : hasProjects ? (
        <>
          {meProjects.data.map((project) => (
            <ProjectCard
              key={project.id}
              bannerUrl={project.bannerUrl}
              name={project.name}
              description={project.description}
              slug={project.slug}
              teamMembers={project.teamMembers}
              status={project.status}
              myRoles={project.myRoles}
            />
          ))}
        </>
      ) : (
        <EmptyProjects
          callToAction={
            <Button asChild>
              <Link href="/me/projects/new">Criar projeto</Link>
            </Button>
          }
        />
      )}
    </div>
  )
}
