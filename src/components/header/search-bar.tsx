'use client'

import { useEffect, useState } from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { ArrowUpRight, Search } from 'lucide-react'

export function SearchBar() {
  const [open, setOpen] = useState(false)

  function handleOpenSearchCommand() {
    setOpen((state) => !state)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="mx-[4.5rem] flex h-12 flex-1 justify-between hover:bg-transparent"
        onClick={handleOpenSearchCommand}
      >
        <div className="flex items-center gap-3">
          <Search size={20} className="text-muted-foreground" />
          <span className="text-muted">Realizar busca</span>
        </div>

        <kbd className="pointer-events-none inline-flex select-none items-center gap-1 font-mono text-sm text-muted-foreground">
          <span className="text-[10px]">⌘</span> K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Realizar busca"
          className="placeholder:text-muted"
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Últimas buscas">
            {Array.from({ length: 3 }).map((_, i) => (
              <CommandItem key={i} className="flex justify-between text-base">
                {`Aplicativos ${i}`}
                <div className="pointer-events-none select-none">
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <Separator />

          <CommandGroup heading="Últimos projetos visitados">
            {Array.from({ length: 3 }).map((_, i) => (
              <CommandItem key={i} className="flex justify-between">
                <div className="flex gap-3">
                  <Avatar size="xxs" variant="square">
                    <AvatarFallback />
                    <AvatarImage src="https://www.github.com/diego3g.png" />
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-base">
                      {`Website E-commerce ${i}`}{' '}
                    </span>
                    <span className="text-muted-foreground">
                      Um site de compras e vendas de games usados e novos
                    </span>
                  </div>
                </div>

                <div className="pointer-events-none select-none">
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
