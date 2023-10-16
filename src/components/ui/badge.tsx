import * as React from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const badgeVariants = tv({
  base: 'inline-flex items-center font-medium rounded-md border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    size: {
      sm: 'py-1 px-2',
      lg: 'py-2.5 px-5',
      default: 'px-4 py-2',
    },
    variant: {
      default:
        'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
      secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
      outline: 'text-foreground',
      static: 'bg-zinc-900 text-zinc-50 border-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, size, className })} {...props} />
  )
}

export { Badge, badgeVariants }
