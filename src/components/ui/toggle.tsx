'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const toggleVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 dark:ring-offset-zinc-950  dark:focus-visible:ring-zinc-300  dark:data-[state=on]:text-zinc-50',
  variants: {
    variant: {
      default: 'bg-transparent',
      outline:
        'border bg-transparent border-zinc-700 hover:text-zinc-50 dark:data-[state=on]:bg-zinc-900',
    },
    size: {
      default: 'p-6',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={twMerge(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
