'use client'

import { Loader2, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useController, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDebounceValue } from '@/hooks/use-debounce-value'
import { InputMessageError } from '@/components/ui/input'

type DataItem = string

export function TechnologiesInput() {
  const { control } = useFormContext<CreateNewProjectSchema>()

  const {
    field,
    formState: { errors },
  } = useController({
    name: 'technologies',
    control,
    defaultValue: [],
  })

  const { value: selectedItems, onChange: setSelectedItems } = field

  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const searchTerm = useDebounceValue(search, 400)

  const { data: technologyOptions, isLoading: isLoadingTechnologyOptions } =
    useQuery({
      queryKey: ['tags', searchTerm],
      queryFn: async () => {
        const response = await axios.get('/api/technologies/search', {
          params: {
            q: searchTerm,
            pageSize: 8,
          },
        })

        return response.data.technologies
      },
      enabled: open,
    })

  const handleUnselect = useCallback(
    (item: DataItem) => {
      const newValue = selectedItems.filter((technology) => technology !== item)

      setSelectedItems(newValue)
    },
    [selectedItems, setSelectedItems],
  )

  const handleAddNewTechnology = useCallback(
    (technology: string) => {
      if (search.length <= 1) {
        return
      }

      setSearch('')
      const isSelected = selectedItems.includes(search)

      if (isSelected) {
        return
      }

      setSelectedItems([...selectedItems, technology])
    },
    [search, setSelectedItems, selectedItems],
  )

  const handleKeyDownOnCommandContainer = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      const button = buttonRef.current
      if (input) {
        if (event.key === 'Delete') {
          if (input.value === '') {
            const newValue = selectedItems
            newValue.pop()

            setSelectedItems(newValue)
          }
        }

        if (event.key === 'Escape') {
          return input.blur()
        }
      }

      if (button) {
        if (event.key === 'Enter') {
          button.click()
        }
      }
    },
    [selectedItems, setSelectedItems],
  )

  let unselectedItems = []

  if (technologyOptions) {
    unselectedItems = technologyOptions.filter(
      (item: string) => !selectedItems.includes(item),
    )
  }

  const hasSelectedItems = selectedItems.length > 0
  const hasSearchValue = !!search

  return (
    <Command
      onKeyDown={handleKeyDownOnCommandContainer}
      className="overflow-visible"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex flex-wrap gap-1">
          {selectedItems.map((technology) => {
            return (
              <Badge key={technology} variant="secondary">
                {technology}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  onClick={() => handleUnselect(technology)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}

          <CommandPrimitive.Input
            id="technologies"
            ref={inputRef}
            value={search}
            onValueChange={setSearch}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={hasSelectedItems ? 'Select more' : 'Select one'}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="relative">
        {errors.technologies && (
          <InputMessageError>{errors.technologies.message}</InputMessageError>
        )}

        {open && hasSearchValue ? (
          <CommandList className="absolute top-0 z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-xl shadow-black/30 outline-none animate-in">
            <CommandEmpty className="px-2 py-3 text-sm">
              <button
                type="button"
                ref={buttonRef}
                onMouseDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
                onClick={() => handleAddNewTechnology(search)}
                className="w-full rounded-md px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground"
              >
                Add new technology:{' '}
                <span className="font-semibold">{`"${search}"`}</span>
              </button>
            </CommandEmpty>

            {isLoadingTechnologyOptions ? (
              <div className="absolute right-2 top-2 cursor-default select-none text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
              </div>
            ) : (
              unselectedItems.length > 0 && (
                <CommandGroup className="h-full">
                  {unselectedItems.map((technology: string) => {
                    return (
                      <CommandItem
                        key={technology}
                        onMouseDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={() => {
                          setSearch('')
                          setSelectedItems([...selectedItems, technology])
                        }}
                      >
                        {technology}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )
            )}
          </CommandList>
        ) : null}
      </div>
    </Command>
  )
}
