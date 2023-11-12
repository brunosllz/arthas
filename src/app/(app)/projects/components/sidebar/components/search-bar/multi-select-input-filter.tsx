'use client'

import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ChevronDown } from 'lucide-react'

interface SelectInputFilterProps {
  name: 'role' | 'skill'
  placeholder: string
  emptyMessage: string
  params: Array<{
    value: string
    label: string
  }>
}

export function MultiSelectInputFilter({
  emptyMessage,
  params,
  name,
  placeholder,
}: SelectInputFilterProps) {
  const { daftProjectsSearchParams, toggleProjectsSearchParam } = useBoundStore(
    ({ daftProjectsSearchParams, toggleProjectsSearchParam }) => ({
      daftProjectsSearchParams,
      toggleProjectsSearchParam,
    }),
  )

  function toggleParam(value: string, label: string) {
    toggleProjectsSearchParam({ label, tag: name, value })
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="xl"
          className="flex w-full justify-between px-3"
        >
          {placeholder}
          <ChevronDown size={16} strokeWidth={2.5} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-max">
        <Command loop>
          <CommandInput />

          <CommandList className="max-h-52 overflow-y-auto pt-4">
            <CommandEmpty className="truncate">{emptyMessage}</CommandEmpty>

            {params.map((param) => {
              const isSelected = daftProjectsSearchParams.some(
                (searchParam) =>
                  searchParam.tag === name &&
                  searchParam.value.toLowerCase() === param.value.toLowerCase(),
              )

              return (
                <CommandItem
                  key={param.value}
                  value={param.value}
                  onSelect={(value) => toggleParam(value, param.label)}
                >
                  <div
                    data-checked={isSelected}
                    className="mr-2 h-4 w-4 rounded-full bg-zinc-900 ring-inset data-[checked=true]:bg-none data-[checked=true]:ring-[3px] data-[checked=true]:ring-zinc-50"
                  />

                  {param.label}
                </CommandItem>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
