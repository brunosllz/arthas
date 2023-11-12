import { Suspense } from 'react'

import { ProjectDetails } from './components/project-details'
import { ProjectDetailsSkeleton } from './components/project-details-skeleton'
import { Metadata } from 'next'

type ProjectsProps = {
  searchParams: {
    currentProjectId: string
  }
}

export const metadata: Metadata = {
  title: 'Projetos',
}

export default async function Projects({ searchParams }: ProjectsProps) {
  return (
    <Suspense
      key={searchParams.currentProjectId}
      fallback={<ProjectDetailsSkeleton />}
    >
      <ProjectDetails currentProjectId={searchParams.currentProjectId} />
    </Suspense>
  )
}
