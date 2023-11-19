'use client'

import { Badge } from '@/components/ui/badge'
import { useBoundStore } from '@/store'
import { X } from 'lucide-react'

export function SelectedItensFiltered() {
  const { daftProjectsSearchParams, deleteProjectsSearchParam } = useBoundStore(
    ({ daftProjectsSearchParams, deleteProjectsSearchParam }) => ({
      daftProjectsSearchParams,
      deleteProjectsSearchParam,
    }),
  )
  function deleteParam(value: string, disabled?: boolean) {
    deleteProjectsSearchParam(value, disabled)
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-3">
      {daftProjectsSearchParams.map((param) => (
        <Badge
          key={param.value}
          size="sm"
          variant="secondary"
          className="gap-1"
        >
          {param.label}
          <button
            type="button"
            onClick={() =>
              deleteParam(param.value, param.tag === 'date' && true)
            }
          >
            {param.tag !== 'date' && <X size={16} />}
          </button>
        </Badge>
      ))}
    </div>
  )
}
