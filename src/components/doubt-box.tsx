import { ComponentProps } from 'react'

import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { twMerge } from 'tailwind-merge'

type DoubtBoxProps = ComponentProps<typeof TooltipContent>

export function DoubtBox(props: DoubtBoxProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="text-muted-foreground transition-colors data-[state=delayed-open]:text-primary">
          <HelpCircle size={16} />
        </TooltipTrigger>
        <TooltipContent
          sideOffset={12}
          className={twMerge(
            'flex max-w-[20.5rem] flex-col gap-2 border-zinc-800 bg-zinc-900 p-4 text-xs ',
            props.className,
          )}
          {...props}
        />
      </Tooltip>
    </TooltipProvider>
  )
}
