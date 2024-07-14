import { Card } from '@/components/ui/card'

type EmptyProjectsProps = {
  callToAction?: React.ReactNode
}

export function EmptyProjects({ callToAction }: EmptyProjectsProps) {
  return (
    <Card className="border-dashed">
      <div className="m-5 space-y-3.5">
        <div className=" h-[8.5rem] rounded-md border" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-6 w-20 rounded-md border" />
          ))}
        </div>
      </div>

      <div className="mb-5 space-y-2 px-5">
        <span className="block font-semibold">Nenhum projeto encontrado</span>
        <span className="block text-sm text-muted-foreground">
          Você ainda não criou nenhum projeto. Crie um novo projeto agora e tire
          seus projetos do papel.
        </span>
      </div>

      <div className="mx-5 flex items-center justify-between border-t py-5">
        <div className="flex -space-x-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-10 rounded-full border-2 bg-background"
            />
          ))}
        </div>

        {callToAction}
      </div>
    </Card>
  )
}
