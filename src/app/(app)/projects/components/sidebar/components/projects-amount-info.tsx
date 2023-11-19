'use client'

import { useBoundStore } from '@/store'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectsAmountInfo() {
  const { amountProjectsFilteredSelected } = useBoundStore(
    ({ amountProjectsFilteredSelected }) => ({
      amountProjectsFilteredSelected,
    }),
  )

  return (
    <>
      {amountProjectsFilteredSelected ? (
        <span className="text-sm text-muted-foreground">
          {amountProjectsFilteredSelected} projetos estão recrutando
        </span>
      ) : (
        <Skeleton className="mt-2 h-4 w-48" />
      )}
    </>
  )
}
