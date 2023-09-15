import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MessagesSquare, User } from 'lucide-react'

export function ProjectListCardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Card
            key={index}
            className="cursor-pointer transition-colors hover:border-card-foreground hover:ring-4 hover:ring-card-foreground/5"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-full" />

                <ul className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-5 w-12" />
                  ))}
                </ul>
              </div>
            </CardHeader>

            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>

            <CardFooter className="space-x-3">
              <div className="flex items-center gap-1">
                <User size={16} className="text-cyan-400" />{' '}
                <Skeleton className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1">
                <MessagesSquare size={16} className="text-green-400" />{' '}
                <Skeleton className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}
