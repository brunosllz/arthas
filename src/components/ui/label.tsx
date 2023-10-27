'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { twMerge } from 'tailwind-merge'

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={twMerge(
      'flex flex-col text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

const LabelDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={twMerge(
      'text-sm font-normal leading-tight text-muted-foreground',
      className,
    )}
    {...props}
  />
))

LabelDescription.displayName = 'LabelDescription'

export { Label, LabelDescription }
