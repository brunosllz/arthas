import lazy from 'next/dynamic'
import { useBoundStore } from '@/store'
import { Role } from '@/actions/get-roles-itens-from-cms'

import { Button } from '@/components/ui/button'
import { InitializerProjectsSearchStore } from '../initializer-projects-search'
import { SelectedItensFiltered } from './selected-itens-filtered'

import { Settings2, Search } from 'lucide-react'
import { GeneralSkills } from '@/actions/get-general-skills-itens'

const Sheet = lazy(async () => {
  const { Sheet } = await import('@/components/ui/sheet')

  return { default: Sheet }
})

const SheetTrigger = lazy(async () => {
  const { SheetTrigger } = await import('@/components/ui/sheet')

  return { default: SheetTrigger }
})

const SheetContent = lazy(async () => {
  const { SheetContent } = await import('@/components/ui/sheet')

  return { default: SheetContent }
})

const SearchForm = lazy(async () => {
  const { SearchForm } = await import('./search-form')

  return { default: SearchForm }
})

type SearchBarProps = {
  roles: Role[]
  generalSkills: GeneralSkills[]
}

export async function SearchBar({ roles, generalSkills }: SearchBarProps) {
  const selectedProjectsSearchParams =
    useBoundStore.getState().selectedProjectsSearchParams

  const daftProjectsSearchParams =
    useBoundStore.getState().daftProjectsSearchParams

  return (
    <>
      <InitializerProjectsSearchStore
        selectedProjectsSearchParams={selectedProjectsSearchParams}
        daftProjectsSearchParams={daftProjectsSearchParams}
      />

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
              <Button variant="outline" className="w-full max-w-[463px]">
                <div className="flex gap-3">
                  <Search size={20} className="text-muted-foreground" />
                  <span className="text-muted">Realizar busca</span>
                </div>
              </Button>

              <SearchForm
                rolesItens={roles}
                generalSkillsItens={generalSkills}
              />
            </div>

            <SelectedItensFiltered />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
