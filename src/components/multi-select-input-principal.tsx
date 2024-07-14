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

import { set, useFormContext } from 'react-hook-form'
// import { CoverFormInput } from '..'

import { Command as CommandPrimitive } from 'cmdk'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
  useState,
} from 'react'

type Option = { value: string; label: string }

type MultiSelectInputProps = {
  placeholder: string
  emptyMessage: string
  options: Array<Option>
  inputType?: 'single' | 'multiple'
  initialValue?: Array<Option>
  onSelectedOptions?: (props: Array<Option>) => void
} & ComponentPropsWithoutRef<typeof PopoverTrigger>

export const MultiSelectInputPrincipal = forwardRef<
  ElementRef<typeof PopoverTrigger>,
  MultiSelectInputProps
>(
  (
    {
      emptyMessage,
      options,
      placeholder,
      inputType = 'multiple',
      onSelectedOptions,
      initialValue,
      ...rest
    },
    ref,
  ) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(() => {
      if (initialValue) {
        return initialValue
      }

      return []
    })

    // const {
    //   setValue,
    //   clearErrors,
    //   formState: { isSubmitting: coverFormIsSubmitting },
    // } = useFormContext<any>()

    // const { editProjectFormSteps, toggleEditProjectWeekDaysFromCover } =
    //   useBoundStore(
    //     ({ editProjectFormSteps, toggleEditProjectWeekDaysFromCover }) => ({
    //       editProjectFormSteps,
    //       toggleEditProjectWeekDaysFromCover,
    //     }),
    //   )

    // function toggleParam(value: string, label: string) {
    //   clearErrors('availableToParticipate.availableDays')

    //   const availableDayGrantThanZero =
    //     editProjectFormSteps.cover.availableToParticipate.availableDays.length > 0
    //   const availableDayLessThanOrEqualSeven =
    //     editProjectFormSteps.cover.availableToParticipate.availableDays.length <=
    //     7

    //   const isAllDaysOption = value === 'all'

    //   const allDaysIsChecked =
    //     editProjectFormSteps.cover.availableToParticipate.availableDays.some(
    //       (day) => day.value === 'all',
    //     )

    //   if (isAllDaysOption) {
    //     if (availableDayGrantThanZero && availableDayLessThanOrEqualSeven) {
    //       useBoundStore.setState(({ editProjectFormSteps }) => ({
    //         editProjectFormSteps: {
    //           ...editProjectFormSteps,
    //           cover: {
    //             ...editProjectFormSteps.cover,
    //             availableToParticipate: {
    //               ...editProjectFormSteps.cover.availableToParticipate,
    //               availableDays: [],
    //             },
    //           },
    //         },
    //       }))
    //     }

    //     params.forEach((day) => {
    //       toggleEditProjectWeekDaysFromCover({
    //         label: day.label,
    //         value: day.value,
    //       })
    //     })

    //     return setValue(
    //       'availableToParticipate.availableDays',
    //       useBoundStore.getState().editProjectFormSteps.cover
    //         .availableToParticipate.availableDays,
    //     )
    //   }

    //   if (allDaysIsChecked && !isAllDaysOption) {
    //     useBoundStore.setState(({ editProjectFormSteps }) => ({
    //       editProjectFormSteps: {
    //         ...editProjectFormSteps,
    //         cover: {
    //           ...editProjectFormSteps.cover,
    //           availableToParticipate: {
    //             ...editProjectFormSteps.cover.availableToParticipate,
    //             availableDays:
    //               editProjectFormSteps.cover.availableToParticipate.availableDays.filter(
    //                 (day) => day.value !== 'all',
    //               ),
    //           },
    //         },
    //       },
    //     }))
    //   }

    //   toggleEditProjectWeekDaysFromCover({ label, value })
    //   setValue(
    //     'availableToParticipate.availableDays',
    //     useBoundStore.getState().editProjectFormSteps.cover.availableToParticipate
    //       .availableDays,
    //   )
    // }

    function toggleParam({ label, value }: { value: string; label: string }) {
      const isSelectedOption = selectedOptions.some(
        (option) => option.value === value,
      )

      if (inputType === 'single') {
        return setSelectedOptions(() => {
          if (isSelectedOption) {
            onSelectedOptions?.([])
            return []
          }

          onSelectedOptions?.([{ value, label }])
          return [{ value, label }]
        })
      }

      if (isSelectedOption) {
        // const removeOption = selectedOptions.filter(
        //   (option) => option.value !== value,
        // )

        return setSelectedOptions((prev) => {
          onSelectedOptions?.(prev.filter((option) => option.value !== value))

          return prev.filter((option) => option.value !== value)
        })
      }

      setSelectedOptions((prev) => {
        onSelectedOptions?.([...prev, { value, label }])

        return [...prev, { value, label }]
      })
    }

    return (
      <Popover modal>
        <PopoverTrigger ref={ref} asChild {...rest}>
          <Button
            id="availability"
            size="input"
            variant="outline"
            // disabled={coverFormIsSubmitting || disabled}
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

              {options.map((param) => {
                const isSelectedOption = selectedOptions.some(
                  (option) => option.value === param.value,
                )

                return (
                  <CommandItem
                    key={param.value}
                    value={param.value}
                    onSelect={(value) =>
                      toggleParam({ value, label: param.label })
                    }
                  >
                    <div
                      data-checked={isSelectedOption}
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
  },
)

MultiSelectInputPrincipal.displayName = 'MultiSelectInputPrincipal'
