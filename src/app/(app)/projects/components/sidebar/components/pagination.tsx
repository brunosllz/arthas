import { Button } from '@/components/ui/button'
import { DOTS, usePagination } from '@/hooks/use-pagination'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  lastPage: number
  currentPage: number
  total: number
  selectPage: (selectedPage: number) => void
  fetchNextPage: () => void
  fetchPreviousPage: () => void
}

export function Pagination({
  currentPage,
  lastPage,
  selectPage,
  total,
  fetchNextPage,
  fetchPreviousPage,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    pageSize: 10,
    totalCount: total,
  })

  function handleSelectPage(selectedPage: number) {
    selectPage(selectedPage)
  }

  function nextPage() {
    if (lastPage > currentPage) {
      return fetchNextPage()
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      return fetchPreviousPage()
    }
  }

  return (
    <footer className="flex items-center space-x-[10px] rounded-md border p-5">
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={Number(currentPage) === 1}
        onClick={previousPage}
      >
        <ChevronLeft size={16} />
      </Button>

      {paginationRange &&
        paginationRange.map((page, index) => {
          if (page === DOTS) {
            return (
              <Button
                key={index}
                variant="ghost"
                size="icon-sm"
                className="font-normal data-[current-index=true]:bg-accent"
              >
                {DOTS}
              </Button>
            )
          }

          return (
            <Button
              key={index}
              onClick={() => handleSelectPage(Number(page))}
              data-current-index={page === Number(currentPage)}
              variant="ghost"
              size="icon-sm"
              className="font-normal data-[current-index=true]:bg-accent"
            >
              {page}
            </Button>
          )
        })}

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={nextPage}
        disabled={Number(currentPage) === lastPage}
      >
        <ChevronRight size={16} />
      </Button>
    </footer>
  )
}
