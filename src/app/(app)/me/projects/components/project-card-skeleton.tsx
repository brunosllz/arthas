import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectListCardSkeleton() {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => {
        return (
          <Card
            key={index}
            className="cursor-pointer transition-colors hover:border-card-foreground hover:ring-4 hover:ring-card-foreground/5"
          >
            <CardHeader className="flex flex-col items-start p-5 pb-6">
              <Skeleton className="h-[8.5rem] w-full" />
              <Skeleton className="h-6 w-16" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-[3.75rem] w-full" />
            </CardContent>

            <CardFooter className="mx-5 flex items-center justify-between border-t px-0 py-5">
              <div className="inline-flex -space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>

              <Skeleton className="h-10 w-10 rounded-full" />
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}
