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
      <TooltipProvider>
        {Array.from({ length: 3 }).map((_, i) => (
          <Tooltip key={i}>
            <TooltipTrigger>
              <Avatar className="ring-1 ring-black transition-all hover:z-10 hover:-translate-y-2 hover:ring-2">
                <AvatarImage src="https://github.com/peedrinhoph.png" />
                <AvatarFallback />
              </Avatar>
            </TooltipTrigger>

            <TooltipContent sideOffset={15}>
              <span className="block text-center text-sm">Bruno Luiz</span>
              <span className="text-sm text-muted-foreground">
                Dev Front-end
              </span>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
