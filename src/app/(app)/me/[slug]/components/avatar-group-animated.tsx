import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function AvatarGroupAnimated() {
  return (
    <div className="flex -space-x-4">
      <TooltipProvider delayDuration={250}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Tooltip key={i}>
            <TooltipTrigger>
              <Avatar className="ring-1 ring-black transition-all hover:z-10 hover:-translate-y-2 hover:ring-2">
                <AvatarImage src="https://github.com/rodrigorgtic.png" />
                <AvatarFallback />
              </Avatar>
            </TooltipTrigger>

            <TooltipContent sideOffset={15} className="dark:bg-primary">
              <span className="block text-center text-sm font-medium text-zinc-900">
                Bruno Luiz
              </span>
              <span className="text-sm font-medium text-zinc-600">
                Dev Front-end
              </span>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
