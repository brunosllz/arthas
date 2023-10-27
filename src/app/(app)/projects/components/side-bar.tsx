import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { Avatar } from '@/components/ui/avatar'
import {
  Settings2,
  Search,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export function SideBar() {
  return (
    <aside className="fixed mt-[9rem] h-screen w-full max-w-[25rem] space-y-6 pb-60">
      <header className="flex items-start justify-between">
        <div>
          <span className="block text-lg font-medium">Lista de projetos</span>
          <span className="text-sm text-muted-foreground">
            50 projetos estão recrutando
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-[10px]">
              Filtrar
              <Settings2 size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <div className="space-y-5 wrapper">
              <div className="flex items-center gap-6">
                <Button variant="outline" size="xl" className="flex-1">
                  <div className="flex gap-3">
                    <Search size={20} className="text-muted-foreground" />
                    <span className="text-muted">Realizar busca</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="gap-[10px] px-7 py-3.5"
                >
                  Funções <ChevronDown size={16} />
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="gap-[10px] px-7 py-3.5"
                >
                  Nível <ChevronDown size={16} />
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="gap-[10px] px-7 py-3.5"
                >
                  Data do anúncio <ChevronDown size={16} />
                </Button>

                <Button
                  size="xl"
                  className="gap-[10px] px-7 py-3.5 font-semibold"
                >
                  Realizar busca
                </Button>
              </div>

              <div className="space-x-3">
                <Badge size="sm" variant="secondary" className="gap-1">
                  UX/UI Designer
                  <X size={16} />
                </Badge>
                <Badge size="sm" variant="secondary" className="gap-1">
                  UX/UI Designer
                  <X size={16} />
                </Badge>
                <Badge size="sm" variant="secondary" className="gap-1">
                  UX/UI Designer
                  <X size={16} />
                </Badge>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <ScrollArea className="h-full">
        <div className="h-full space-y-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex-row items-start gap-3 space-y-0 p-5">
                <Avatar
                  size="xs"
                  variant="square"
                  className="bg-zinc-800 ring-1 ring-zinc-700"
                >
                  {/* <AvatarImage src="https://github.com/brunosllz.png" /> */}
                  {/* <AvatarFallback className="" /> */}
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">Website E-commerce</span>
                    <span className="text-xs text-muted-foreground">14hs</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-zinc-200">
                      Bruno Silveira Luiz
                    </span>

                    <span className="text-lg text-zinc-900">•</span>

                    <span className="text-sm text-muted-foreground">
                      Full Stack
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 px-5">
                <p className="line-clamp-3 text-sm">
                  Estamos criando uma plataforma de compras online sensacional e
                  precisamos de pessoas apaixonadas para nos ajudar. Imagine
                  reinventar a maneira como as pessoas compram na internet e
                  fazer parte dessa revolução. Vem com a gente e faça parte
                  desse projeto incrível!
                </p>

                <div className="space-x-2 border-t pt-4 ">
                  <Badge size="sm" variant="secondary">
                    Front-end
                  </Badge>
                  <Badge size="sm" variant="secondary">
                    Front-end
                  </Badge>
                  <Badge size="sm" variant="secondary">
                    {' '}
                    Front-end
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          <footer className="flex items-center space-x-[10px] rounded-md border p-5">
            <Button variant="outline" size="icon">
              <ChevronLeft size={16} />
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              1
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              2
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              3
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              4
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              ...
            </Button>

            <Button variant="outline" size="icon" className="font-normal">
              10
            </Button>

            <Button variant="outline" size="icon">
              <ChevronRight size={16} />
            </Button>
          </footer>
        </div>
      </ScrollArea>
    </aside>
  )
}
