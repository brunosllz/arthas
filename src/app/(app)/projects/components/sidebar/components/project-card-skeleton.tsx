import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-start gap-3 space-y-0 p-5 pb-4">
        <Skeleton className="h-[2.625rem] w-[2.625rem] rounded-md ring-1 ring-zinc-700" />

        <div className="flex-1 items-end">
          <div className="flex items-start justify-between gap-24">
            <Skeleton className="h-[18px] w-full" />
            <Skeleton className="h-4 w-9" />
          </div>

          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-32" />

            <span className="text-lg text-zinc-900">•</span>

            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5">
        <div className="space-y-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>

        <div className="flex items-center gap-3 border-t pt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-14" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
