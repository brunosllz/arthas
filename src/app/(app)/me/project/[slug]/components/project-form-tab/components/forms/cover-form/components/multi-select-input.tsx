'use client'

import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ChevronDown } from 'lucide-react'

import { useFormContext } from 'react-hook-form'
import { CoverFormInput } from '..'

import { Command as CommandPrimitive } from 'cmdk'

interface SelectInputFilterProps {
  placeholder: string
  emptyMessage: string
  disabled?: boolean
  params: Array<{
    value: string
    label: string
  }>
}

export function MultiSelectInput({
  emptyMessage,
  params,
  placeholder,
  disabled,
}: SelectInputFilterProps) {
  const {
    setValue,
    clearErrors,
    formState: { isSubmitting: coverFormIsSubmitting },
  } = useFormContext<CoverFormInput>()

  const { editProjectFormSteps, toggleEditProjectWeekDaysFromCover } =
    useBoundStore(
      ({ editProjectFormSteps, toggleEditProjectWeekDaysFromCover }) => ({
        editProjectFormSteps,
        toggleEditProjectWeekDaysFromCover,
      }),
    )

  function toggleParam(value: string, label: string) {
    clearErrors('availableToParticipate.availableDays')

    const availableDayGrantThanZero =
      editProjectFormSteps.cover.availableToParticipate.availableDays.length > 0
    const availableDayLessThanOrEqualSeven =
      editProjectFormSteps.cover.availableToParticipate.availableDays.length <=
      7

    const isAllDaysOption = value === 'all'

    const allDaysIsChecked =
      editProjectFormSteps.cover.availableToParticipate.availableDays.some(
        (day) => day.value === 'all',
      )

    if (isAllDaysOption) {
      if (availableDayGrantThanZero && availableDayLessThanOrEqualSeven) {
        useBoundStore.setState(({ editProjectFormSteps }) => ({
          editProjectFormSteps: {
            ...editProjectFormSteps,
            cover: {
              ...editProjectFormSteps.cover,
              availableToParticipate: {
                ...editProjectFormSteps.cover.availableToParticipate,
                availableDays: [],
              },
            },
          },
        }))
      }

      params.forEach((day) => {
        toggleEditProjectWeekDaysFromCover({
          label: day.label,
          value: day.value,
        })
      })

      return setValue(
        'availableToParticipate.availableDays',
        useBoundStore.getState().editProjectFormSteps.cover
          .availableToParticipate.availableDays,
      )
    }

    if (allDaysIsChecked && !isAllDaysOption) {
      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
            availableToParticipate: {
              ...editProjectFormSteps.cover.availableToParticipate,
              availableDays:
                editProjectFormSteps.cover.availableToParticipate.availableDays.filter(
                  (day) => day.value !== 'all',
                ),
            },
          },
        },
      }))
    }

    toggleEditProjectWeekDaysFromCover({ label, value })
    setValue(
      'availableToParticipate.availableDays',
      useBoundStore.getState().editProjectFormSteps.cover.availableToParticipate
        .availableDays,
    )
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          id="availability"
          size="input"
          variant="outline"
          disabled={coverFormIsSubmitting || disabled}
          className="flex w-full justify-between px-3 text-muted-foreground focus:ring-1 focus:ring-ring "
        >
          {placeholder}
          <ChevronDown size={16} strokeWidth={2.5} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={`w-[--radix-popover-trigger-width]`}
        sideOffset={12}
      >
        <Command loop>
          <CommandList className="max-h-56 w-full overflow-y-auto">
            <CommandPrimitive.Input className={'sr-only text-[0px]'} />

            <CommandEmpty className="truncate">{emptyMessage}</CommandEmpty>

            {params.map((param) => {
              const isSelected =
                editProjectFormSteps.cover.availableToParticipate.availableDays.some(
                  (day) => day.value === param.value,
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
