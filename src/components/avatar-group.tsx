import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const peopleItens = [
  {
    name: 'Jakeliny Gracielly',
    avatar: 'https://github.com/jakeliny.png',
  },

  {
    name: 'Rodrigo Gonçalves',
    avatar: 'https://github.com/rodrigorgtic.png',
  },
  {
    name: 'Diego Fernandes',
    avatar: 'https://github.com/diego3g.png',
  },
]

export function AvatarGroup() {
  return (
    <div className="flex -space-x-4">
      {peopleItens.map((item) => {
        return (
          <Avatar key={item.name} className="ring-1 ring-black">
            <AvatarImage src={item.avatar} alt={item.name} />
            <AvatarFallback />
          </Avatar>
        )
      })}
    </div>
  )
}
