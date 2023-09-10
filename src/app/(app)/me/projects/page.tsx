import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { EmptyProjects } from './components/empty-projects'
import { ProjectList } from './components/project-list'
import { useSession } from 'next-auth/react'
import { Metadata } from 'next'
import axios from 'axios'
import { externalApi } from '@/libs/axios'

export const metadata: Metadata = {
  title: 'My Projects',
}

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

export default async function MyProjects() {
  const { data: projects } = await externalApi.get<Project[]>('/projects/me')

  const hasProjects = projects.length > 0

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">My projects</h1>
          <span className="block text-muted-foreground">
            Manage your projects.
          </span>
        </div>

        <div
          data-hasProjects={hasProjects}
          className="data-[hasProjects=false]:hidden"
        >
          <Button asChild>
            <Link href="/me/projects/new">Add project</Link>
          </Button>
        </div>
      </div>

      <Separator className="mb-8 mt-4" />

      <div>{hasProjects ? <ProjectList /> : <EmptyProjects />}</div>
    </div>
  )
}
