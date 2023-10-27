'use client'

import { Check, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { twMerge } from 'tailwind-merge'
import { ComponentProps, useRef, useState } from 'react'
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form'

interface ComboBoxProps<T extends FieldValues = FieldValues>
  extends ComponentProps<typeof PopoverTrigger> {
  items: Array<{
    value: string
    label: string
  }>
  name: Path<T>
  placeholder: string
  searchPlaceholder: string
  notFoundPlaceholder: string
  onChangeValue?: (name: string, value: string) => void
}

export function Combobox<T extends FieldValues = FieldValues>({
  name,
  items,
  notFoundPlaceholder,
  placeholder,
  searchPlaceholder,
  onChangeValue,
  ...props
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild {...props}>
            <Button
              ref={triggerRef}
              variant="outline"
              size="input"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? (
                items.find((item) => item.value === value)?.label
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className={`w-[${triggerRef.current?.offsetWidth}px] p-0`}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>{notFoundPlaceholder}</CommandEmpty>

              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue)

                      if (onChangeValue) {
                        onChangeValue(name, currentValue)
                      }

                      setOpen(false)
                    }}
                  >
                    <Check
                      className={twMerge(
                        'mr-2 h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
