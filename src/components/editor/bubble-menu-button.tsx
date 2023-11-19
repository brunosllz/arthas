import { ComponentProps } from 'react'
import { TooltipTrigger } from '../ui/tooltip'

type BubbleButtonProps = ComponentProps<typeof TooltipTrigger>

export function BubbleMenuButton(props: BubbleButtonProps) {
  return (
    <TooltipTrigger
      type="button"
      className="rounded-sm p-2 data-[active=true]:bg-zinc-700 data-[active=true]:text-violet-400 hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none"
      {...props}
    />
  )
}
