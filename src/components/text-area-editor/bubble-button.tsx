import { ComponentProps } from 'react'
import { TooltipTrigger } from '../ui/tooltip'

type BubbleButtonProps = ComponentProps<typeof TooltipTrigger>

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <TooltipTrigger
      type="button"
      className="rounded-md p-2 data-[active=true]:text-violet-400 hover:bg-zinc-600 focus:bg-zinc-600 focus:outline-none"
      {...props}
    />
  )
}
