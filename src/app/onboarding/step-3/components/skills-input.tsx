'use client'

import { Loader2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDebounceValue } from '@/hooks/use-debounce-value'
import { InputMessageError } from '@/components/ui/input'
import { ThirdStepInput } from './third-step-form'
import { useBoundStore } from '@/store'

type DataItem = string

interface SkillsInputProps {
  disabled?: boolean
}

export function SkillsInput({ disabled }: SkillsInputProps) {
  const { control } = useFormContext<ThirdStepInput>()
  const { user } = useBoundStore(({ user }) => {
    return {
      user,
    }
  })

  const {
    field,
    formState: { errors },
  } = useController({
    name: 'skills',
    control,
    disabled,
    defaultValue: user.skills ?? [],
  })

  const { value: selectedItems, onChange: setSelectedItems } = field

  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const setUser = useBoundStore((state) => state.setUser)

  const searchTerm = useDebounceValue(search, 400)

  const { data: skillOptions, isLoading: isLoadingSkillOptions } = useQuery({
    queryKey: ['skills', searchTerm],
    queryFn: async () => {
      const response = await axios.get('/api/skills/search', {
        params: {
          q: searchTerm,
          pageSize: 8,
        },
      })

      console.log(response.data.skills)

      return response.data.skills
    },
    enabled: open,
  })

  const handleUnselect = useCallback(
    (item: DataItem) => {
      const newValue = selectedItems.filter((skill) => skill !== item)

      setSelectedItems(newValue)
    },
    [selectedItems, setSelectedItems],
  )

  const handleAddNewSkill = useCallback(
    (skill: string) => {
      if (search.length <= 1) {
        return
      }

      setSearch('')
      const isSelected = selectedItems.includes(search)

      if (isSelected) {
        return
      }

      setSelectedItems([...selectedItems, skill])
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

  if (skillOptions) {
    unselectedItems = skillOptions.filter(
      (item: string) => !selectedItems.includes(item),
    )
  }

  const hasSelectedItems = selectedItems.length > 0
  const hasSearchValue = !!search

  useEffect(() => {
    setUser({
      skills: selectedItems,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems])

  return (
    <Command
      onKeyDown={handleKeyDownOnCommandContainer}
      className="overflow-visible"
    >
      <div className="group flex min-h-[3.125rem] items-center rounded-md border border-input px-3 py-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex flex-wrap gap-1">
          {selectedItems.map((skill) => {
            return (
              <Badge key={skill} variant="secondary">
                {skill}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  disabled={disabled}
                  onClick={() => handleUnselect(skill)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}

          <CommandPrimitive.Input
            id="skills"
            ref={inputRef}
            value={search.toLowerCase()}
            onValueChange={setSearch}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={
              hasSelectedItems ? 'Selecionar mais' : 'Selecione uma habilidade'
            }
            className="ml-2 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="relative">
        {errors.skills && (
          <InputMessageError>{errors.skills.message}</InputMessageError>
        )}

        {open && hasSearchValue ? (
          <CommandList className="absolute top-0 z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-xl shadow-black/30 outline-none animate-in">
            <CommandEmpty className="px-2 py-3 text-sm">
              {selectedItems.includes(search) ? (
                <div className="px-2 py-1.5">
                  <span className="text-sm">
                    Você já possui está habilidade
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  ref={buttonRef}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  onClick={() => handleAddNewSkill(search)}
                  className="w-full rounded-md px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground"
                >
                  Adicionar nova habilidade:{' '}
                  <span className="font-semibold">{`"${search}"`}</span>
                </button>
              )}
            </CommandEmpty>

            {isLoadingSkillOptions ? (
              <div className="absolute right-2 top-2 cursor-default select-none text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
              </div>
            ) : (
              unselectedItems.length > 0 && (
                <CommandGroup className="h-full">
                  {unselectedItems.map((skill: string) => {
                    return (
                      <CommandItem
                        key={skill}
                        onMouseDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={() => {
                          setSearch('')
                          setSelectedItems([...selectedItems, skill])
                        }}
                      >
                        {skill}
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
