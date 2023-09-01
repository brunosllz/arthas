import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { EmptyProjects } from './components/empty-projects'
import { ProjectList } from './components/project-list'

export default function MyProjects() {
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
        // className="hidden"
        >
          <Button asChild>
            <Link href="/me/projects/new">Add project</Link>
          </Button>
        </div>
      </div>

      <Separator className="mb-8 mt-4" />

      <div>
        {/* <EmptyProjects /> */}
        <ProjectList />
      </div>
    </div>
  )
}
