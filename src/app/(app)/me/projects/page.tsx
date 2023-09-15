import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { ProjectList } from './components/project-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Projects',
}

export default async function MyProjects() {
  // const hasProjects = projects.length > 0

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
          // data-has-projects={hasProjects}
          className="data-[has-projects=false]:hidden"
        >
          <Button asChild>
            <Link href="/me/projects/new">Add project</Link>
          </Button>
        </div>
      </div>

      <Separator className="mb-8 mt-4" />
      <ProjectList />
    </div>
  )
}
