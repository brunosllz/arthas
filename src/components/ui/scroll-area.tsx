'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { twMerge } from 'tailwind-merge'

type ScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> & {
  viewport?: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>
  scrollbar?: React.ComponentProps<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  >
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, viewport, scrollbar, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={twMerge('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className="h-full w-full rounded-[inherit]"
      {...viewport}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar {...scrollbar} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={twMerge(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-[1px]',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
