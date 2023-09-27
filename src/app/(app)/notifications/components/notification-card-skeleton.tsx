import { Skeleton } from '@/components/ui/skeleton'

export function NotificationCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-2">
      <Skeleton className="h-14 w-14 rounded-full" />

      <Skeleton className="h-12 w-full flex-1" />
    </div>
  )
}
