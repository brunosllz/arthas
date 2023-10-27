import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function AvatarGroup() {
  return (
    <div className="flex -space-x-4">
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <Avatar key={i} className="ring-1 ring-black">
            <AvatarImage src="https://github.com/maykbrito.png" />
            <AvatarFallback />
          </Avatar>
        )
      })}
    </div>
  )
}
