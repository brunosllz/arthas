/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { clientExternalApi } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'
import { PaginationResponseData } from '@/@types/pagination-response-data'

import { ScrollArea } from '@/components/ui/scroll-area'
import { ProjectCardSkeleton } from './project-card-skeleton'
import { ProjectCard } from './project-card'
import { Pagination } from './pagination'
import { useBoundStore } from '@/store'
import { TagInput } from '@/store/slices/projects-search-slice'
import { mergeSearchParams } from '@/utils/merge-search-params'
import { dateItensFilter } from './search-bar/search-form'
import { Role } from '@/actions/get-roles-itens-from-cms'
import { GeneralSkills } from '@/actions/get-general-skills-itens'

export type ProjectShortDetails = {
  id: string
  imageUrl: string | null
  name: string
  description: string
  author: {
    name: string
    role: string
  }
  skills: Array<string>
  createdAt: string
}

type ProjectsListProps = {
  rolesItens: Array<Role>
  generalSkillsItens: Array<GeneralSkills>
}

export function ProjectsList({
  rolesItens,
  generalSkillsItens,
}: ProjectsListProps) {
  const scrollAreaViewPortRef = useRef<HTMLDivElement | null>(null)
  const { currentPage } = useBoundStore(({ currentPage }) => ({
    currentPage,
  }))
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedProjectsSearchParams =
    useBoundStore.getState().selectedProjectsSearchParams

  const {
    data: projectsResponse,
    isLoading,
    isSuccess,
  } = useQuery<PaginationResponseData<ProjectShortDetails[]>>({
    queryKey: [
      'projects',
      'short',
      'details',
      selectedProjectsSearchParams,
      useBoundStore.getState().currentPage,
    ],
    queryFn: async () => {
      const selectedProjectsSearchParams =
        useBoundStore.getState().selectedProjectsSearchParams

      const mergedParams = mergeSearchParams(selectedProjectsSearchParams)

      const { data } = await clientExternalApi.get(
        `/projects/short/details?page=${useBoundStore.getState().currentPage}&${
          selectedProjectsSearchParams.length && mergedParams
        }`,
      )

      return data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  useEffect(() => {
    useBoundStore.setState({
      submitSelectedProjectIsLoading: false,
    })
  }, [isSuccess])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    return params
      .toString()
      .split('&')
      .forEach((param) => {
        const [paramKey, paramValue] = param.split('=')

        switch (paramKey) {
          case 'currentProjectId':
            return useBoundStore.setState({
              currentSelectedProjectId: paramValue,
            })
          case 'page':
            return useBoundStore.setState({
              currentPage: Number(paramValue),
            })
          case 'date':
            return useBoundStore.setState(
              ({ selectedProjectsSearchParams, daftProjectsSearchParams }) => {
                if (paramValue === 'recent') {
                  return {
                    selectedProjectsSearchParams: [
                      {
                        tag: paramKey as TagInput,
                        value: paramValue,
                      },
                      ...selectedProjectsSearchParams,
                    ],
                  }
                }

                return {
                  selectedProjectsSearchParams: [
                    {
                      tag: paramKey as TagInput,
                      value: paramValue,
                    },
                    ...selectedProjectsSearchParams,
                  ],
                  daftProjectsSearchParams: daftProjectsSearchParams.map(
                    (param) => {
                      if (param.tag === 'date') {
                        return {
                          tag: paramKey as TagInput,
                          value: paramValue,
                          label: dateItensFilter.find(
                            (item) => item.value === paramValue,
                          )?.label,
                        }
                      }

                      return param
                    },
                  ),
                }
              },
            )
          case 'role':
            // eslint-disable-next-line no-case-declarations
            const [, roleValue] = param.split('role=')

            return roleValue.split('%2C').forEach((roleValue) => {
              return useBoundStore.setState(
                ({
                  selectedProjectsSearchParams,
                  daftProjectsSearchParams,
                }) => ({
                  selectedProjectsSearchParams: [
                    {
                      tag: paramKey as TagInput,
                      value: roleValue,
                    },
                    ...selectedProjectsSearchParams,
                  ],
                  daftProjectsSearchParams: [
                    {
                      tag: paramKey as TagInput,
                      value: roleValue,
                      label: rolesItens.find((item) => item.value === roleValue)
                        ?.label,
                    },
                    ...daftProjectsSearchParams,
                  ],
                }),
              )
            })
          case 'skill':
            // eslint-disable-next-line no-case-declarations
            const [, skillValue] = param.split('skill=')

            return skillValue.split('%2C').forEach((skillValue) => {
              return useBoundStore.setState(
                ({
                  selectedProjectsSearchParams,
                  daftProjectsSearchParams,
                }) => ({
                  selectedProjectsSearchParams: [
                    {
                      tag: paramKey as TagInput,
                      value: skillValue,
                    },
                    ...selectedProjectsSearchParams,
                  ],
                  daftProjectsSearchParams: [
                    {
                      tag: paramKey as TagInput,
                      value: skillValue,
                      label: generalSkillsItens.find(
                        (item) => item.value === skillValue,
                      )?.label,
                    },
                    ...daftProjectsSearchParams,
                  ],
                }),
              )
            })

          default:
        }
      })
  }, [])

  useEffect(() => {
    useBoundStore.setState({
      amountProjectsFilteredSelected: projectsResponse?.total,
    })

    const params = new URLSearchParams(searchParams)
    const hasntCurrentProjectedInURL = !params.has('currentProjectId')
    const projectsResponseIsLoaded = projectsResponse?.data.length

    if (projectsResponseIsLoaded === 0) {
      const pageFromUrl = params.get('page')

      if (
        Number(pageFromUrl) > projectsResponse?.lastPage! &&
        projectsResponse?.lastPage! > 0
      ) {
        params.set('page', String(projectsResponse?.lastPage))
        useBoundStore.setState({
          currentPage: projectsResponse?.lastPage,
        })

        return router.replace(`${pathname}?${params.toString()}`)
      }
    }

    if (hasntCurrentProjectedInURL && projectsResponseIsLoaded) {
      useBoundStore.setState({
        currentSelectedProjectId: projectsResponse.data[0].id,
      })

      params.set('currentProjectId', projectsResponse.data[0].id)
      params.set('page', String(useBoundStore.getState().currentPage))

      return router.replace(`${pathname}?${params.toString()}`)
    }

    if (projectsResponseIsLoaded) {
      const hasntCurrentSelectedProjectInResponse =
        !projectsResponse?.data.some(
          (project) =>
            project.id === useBoundStore.getState().currentSelectedProjectId,
        )

      if (hasntCurrentSelectedProjectInResponse) {
        params.set('currentProjectId', projectsResponse.data[0].id)
        params.set('page', String(useBoundStore.getState().currentPage))
        useBoundStore.setState({
          currentSelectedProjectId: projectsResponse.data[0].id,
        })

        return router.replace(`${pathname}?${params.toString()}`)
      }
    }
  }, [projectsResponse?.data.length, searchParams.size, currentPage])

  const fetchNextPage = useCallback(() => {
    scrollAreaViewPortRef.current?.scrollTo(0, 0)

    useBoundStore.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
    }))
  }, [])

  const fetchPreviousPage = useCallback(() => {
    scrollAreaViewPortRef.current?.scrollTo(0, 0)

    useBoundStore.setState(({ currentPage }) => ({
      currentPage: currentPage - 1,
    }))
  }, [])

  const selectPage = useCallback((pageIndex: number) => {
    scrollAreaViewPortRef.current?.scrollTo(0, 0)

    useBoundStore.setState({
      currentPage: pageIndex,
    })
  }, [])

  if (!projectsResponse) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </>
    )
  }

  const { data: projects, lastPage, total } = projectsResponse

  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </>
      ) : projects.length ? (
        <ScrollArea
          viewport={{
            ref: scrollAreaViewPortRef,
          }}
          className="h-full pb-4 pr-3"
        >
          <div className="h-full space-y-6">
            {projects.map((project) => {
              return <ProjectCard key={project.id} project={project} />
            })}

            {lastPage > 1 && (
              <Pagination
                currentPage={useBoundStore.getState().currentPage}
                lastPage={lastPage}
                selectPage={selectPage}
                fetchNextPage={fetchNextPage}
                total={total}
                fetchPreviousPage={fetchPreviousPage}
              />
            )}
          </div>
        </ScrollArea>
      ) : (
        <span className="block font-light text-muted-foreground">
          Infelizmente não encontramos nenhum projeto, experiemente fazer uma
          nova busca com novos filtros.
        </span>
      )}
    </>
  )
}
