import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'

export function EmptyProjects() {
  return (
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
  )
}
