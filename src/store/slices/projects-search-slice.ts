import { StateCreator } from 'zustand'

export type TagInput = 'role' | 'skill' | 'date' | 'page'
export type Param = {
  tag: TagInput
  value: string
  label?: string
}

export type ProjectsSearchSlice = {
  submitSelectedProjectIsLoading: boolean
  selectedProjectsSearchParams: Array<Param>
  daftProjectsSearchParams: Array<Param>
  currentSelectedProjectId: string | null
  amountProjectsFilteredSelected: null | number
  currentPage: number
  setProjectsSearchParam: (param: Param) => void
  toggleProjectsSearchParam: (param: Param) => void
  deleteProjectsSearchParam: (value: string, disable?: boolean) => void
  setSelectedProjectsSearchParams: () => void
}

const createProjectsSearchSlice: StateCreator<ProjectsSearchSlice> = (
  set,
  get,
) => ({
  amountProjectsFilteredSelected: null,
  currentSelectedProjectId: null,
  selectedProjectsSearchParams: [],
  daftProjectsSearchParams: [
    {
      tag: 'date',
      value: 'recent',
      label: 'Mais recentes',
    },
  ],
  currentPage: 1,
  submitSelectedProjectIsLoading: false,
  setProjectsSearchParam: ({ label, tag, value }: Param) => {
    const paramIsSelected = get().daftProjectsSearchParams.find(
      (param) => param.tag === tag && param.value === value,
    )

    if (paramIsSelected) {
      return
    }

    const tagIsSelected = get().daftProjectsSearchParams.find(
      (param) => param.tag === tag,
    )

    if (tagIsSelected) {
      return set(({ daftProjectsSearchParams }) => ({
        daftProjectsSearchParams: daftProjectsSearchParams.map((param) => {
          if (param.tag === tag) {
            return { ...param, value, label }
          }

          return param
        }),
      }))
    }

    return set(({ daftProjectsSearchParams }) => ({
      daftProjectsSearchParams: [
        ...daftProjectsSearchParams,
        { tag, value, label },
      ],
    }))
  },
  toggleProjectsSearchParam: ({ label, tag, value }: Param) => {
    const isSelectedParam = get().daftProjectsSearchParams.some(
      (item) => item.value === value,
    )

    if (isSelectedParam) {
      return set(({ daftProjectsSearchParams }) => ({
        daftProjectsSearchParams: daftProjectsSearchParams.filter(
          (item) => item.value !== value,
        ),
      }))
    }

    set(({ daftProjectsSearchParams }) => ({
      daftProjectsSearchParams: [
        { tag, value, label },
        ...daftProjectsSearchParams,
      ],
    }))
  },
  deleteProjectsSearchParam: (value, disable = false) => {
    if (disable) {
      return
    }

    set({
      daftProjectsSearchParams: get().daftProjectsSearchParams.filter(
        (param) => param.value !== value,
      ),
    })
  },
  setSelectedProjectsSearchParams: () => {
    set(({ daftProjectsSearchParams }) => ({
      currentPage: 1,
      selectedProjectsSearchParams: [
        ...daftProjectsSearchParams.map((param) => ({
          tag: param.tag,
          value: param.value,
        })),
      ],
    }))
  },
})

export { createProjectsSearchSlice }
