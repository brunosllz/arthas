'use client'

import { FormEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Role } from '@/actions/get-roles-itens-from-cms'
import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import { MultiSelectInputFilter } from './multi-select-input-filter'
import { SelectInputFilter } from './select-input-filter'
import { GeneralSkills } from '@/actions/get-general-skills-itens'
import { Loader2 } from 'lucide-react'

import { Param } from '@/store/slices/projects-search-slice'
import { arraysHaveEqualProperty } from '@/utils/array-have-equal-property'

type SearchFormProps = {
  rolesItens: Role[]
  generalSkillsItens: GeneralSkills[]
}

export const dateItensFilter = [
  {
    value: 'recent',
    label: 'Mais recentes',
  },
  {
    value: 'day',
    label: 'Últimas 24 horas',
  },
  {
    value: 'week',
    label: 'Última semana',
  },
  {
    value: 'month',
    label: 'Último mês',
  },
]

export function SearchForm({
  rolesItens,
  generalSkillsItens,
}: SearchFormProps) {
  const { setSelectedProjectsSearchParams, submitSelectedProjectIsLoading } =
    useBoundStore(
      ({
        setSelectedProjectsSearchParams,
        submitSelectedProjectIsLoading,
      }) => ({
        setSelectedProjectsSearchParams,
        submitSelectedProjectIsLoading,
      }),
    )
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleSearchSelectedSearchParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    useBoundStore.setState({
      submitSelectedProjectIsLoading: true,
    })

    const daftProjectsSearchParams =
      useBoundStore.getState().daftProjectsSearchParams
    const selectedProjectsSearchParams =
      useBoundStore.getState().selectedProjectsSearchParams

    const ParamsIsEqual = arraysHaveEqualProperty<Param>(
      daftProjectsSearchParams,
      selectedProjectsSearchParams,
      'value',
    )

    if (ParamsIsEqual) {
      return useBoundStore.setState({
        submitSelectedProjectIsLoading: false,
      })
    }

    const params = new URLSearchParams(searchParams)

    const defaultParamsIsSelected = daftProjectsSearchParams.every(
      (param) => param.tag === 'date' && param.value === 'recent',
    )

    if (defaultParamsIsSelected) {
      router.replace(pathname)

      return useBoundStore.setState({
        selectedProjectsSearchParams: [],
        submitSelectedProjectIsLoading: false,
      })
    }

    selectedProjectsSearchParams.forEach((param) => {
      const paramExists = params.get(param.tag)

      if (paramExists) {
        return params.delete(param.tag)
      }
    })

    setSelectedProjectsSearchParams()

    const currentSelectedProjectsSearchParams =
      useBoundStore.getState().selectedProjectsSearchParams

    const hasSelectedParams = currentSelectedProjectsSearchParams.length > 0

    if (hasSelectedParams) {
      currentSelectedProjectsSearchParams.forEach((param) => {
        const paramTagIsSelected = params.get(param.tag)

        if (paramTagIsSelected) {
          return params.set(param.tag, `${paramTagIsSelected},${param.value}`)
        }

        params.set(param.tag, param.value)
      })

      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <form
      onSubmit={handleSearchSelectedSearchParams}
      className="flex w-full items-center gap-6"
    >
      <MultiSelectInputFilter
        params={rolesItens}
        emptyMessage="Nenhuma função encontrada"
        name="role"
        placeholder="Função"
      />

      <MultiSelectInputFilter
        params={generalSkillsItens}
        emptyMessage="Nenhum nível encontrado"
        name="skill"
        placeholder="Habilidade"
      />

      <SelectInputFilter
        params={dateItensFilter}
        emptyMessage="Nenhuma data encontrada"
        name="date"
        placeholder="Data do anúncio"
      />

      <Button
        disabled={submitSelectedProjectIsLoading}
        className="w-full max-w-[9.6875rem] font-semibold"
      >
        {submitSelectedProjectIsLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          'Realizar busca'
        )}
      </Button>
    </form>
  )
}
