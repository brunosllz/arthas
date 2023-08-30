import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { GanttChartSquare } from 'lucide-react'

export default function MyProjects() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">My projects</h1>
          <span className="block text-muted-foreground">
            Manage your projects.
          </span>
        </div>

        <div className="hidden">
          <Button asChild>
            <Link href="/me/projects/new">Add project</Link>
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <Card className="flex flex-col items-center justify-center border-dashed py-14">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <GanttChartSquare />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="space-y-3 text-center">
              <h2 className="text-xl font-medium">No projects</h2>
              <span className="text-sm text-muted-foreground">
                Create a project to start your journey
              </span>
            </div>

            <Button className="mt-8" asChild>
              <Link href="/me/projects/new">Add project</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
