import { CardContent, Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-6 page-container">
      <Card className="overflow-hidden">
        <Skeleton className="relative h-36 w-full bg-zinc-900">
          <div className="absolute -bottom-[44px] left-6 h-[5.5rem] w-[5.5rem] rounded-full bg-zinc-800 ring-2 ring-black">
            <Skeleton />
          </div>
        </Skeleton>

        <CardContent className="mt-[68px] space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-[31px] w-[250px]" />

              <div className="inline-flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-[21px] w-[139px]" />

                  <span className="text-lg leading-none text-zinc-900">•</span>

                  <Skeleton className="h-[21px] w-[73px]" />
                </div>

                <Skeleton className="h-[18px] w-[139px]" />
              </div>
            </div>

            <div className="space-y-3 pb-2">
              <Skeleton className="h-[21px] w-[118px]" />

              <div className="space-x-4">
                <span className="inline-flex gap-2 text-sm text-muted-foreground/90">
                  <Skeleton className="h-[18px] w-[18px]" />
                  <Skeleton className="h-[18px] w-[164px]" />
                </span>

                <span className="inline-flex gap-2 text-sm text-muted-foreground/90">
                  <Skeleton className="h-[18px] w-[18px]" />
                  <Skeleton className="h-[18px] w-[24px]" />
                </span>
              </div>
            </div>

            <Skeleton className="h-10 w-[177px]" />
          </div>

          <Separator className="bg-zinc-900" />

          <div className="space-y-4">
            <Skeleton className="h-[23px] w-[179px]" />

            <div className="space-y-1.5">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-[18px] w-full" />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-20" />
              ))}
            </div>
          </div>

          <Separator className="bg-zinc-900" />

          <div className="flex items-center gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-[156px]" />
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-[23px] w-[179px]" />

              <div className="space-y-1.5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-[18px] w-full" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-[23px] w-[179px]" />

              <div className="space-y-1.5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-[18px] w-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
