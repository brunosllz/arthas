'use client'

import { useBoundStore } from '@/store'
import { useRef } from 'react'

type InitializerEditProjectStore = {
  project: {
    projectId: string
    projectName: string
    avatarUrl: string
    bannerUrl: string
    availableDays: Array<string>
    roleItens: Array<{ label: string; value: string }>
    roles: Array<{
      roleId: string
      membersAmount: number
      name: string
      description: string
    }>
  }
}

const WEEKDAYS = [
  {
    label: 'Todos os dias',
    value: 'all',
  },
  {
    label: 'Domingo',
    value: '0',
  },
  {
    label: 'Segunda - feira',
    value: '1',
  },
  {
    label: 'Terça - feira',
    value: '2',
  },
  {
    label: 'Quarta - feira',
    value: '3',
  },
  {
    label: 'Quinta - feira',
    value: '4',
  },
  {
    label: 'Sexta - feira',
    value: '5',
  },
  {
    label: 'Sábado',
    value: '6',
  },
]

export function InitializerEditProjectStore({
  project,
}: InitializerEditProjectStore) {
  const initializer = useRef(false)

  if (!initializer.current) {
    const allDaysIsSelected = project.availableDays.length === 7

    useBoundStore.setState((state) => ({
      editProjectFormSteps: {
        ...state.editProjectFormSteps,
        cover: {
          ...state.editProjectFormSteps.cover,
          avatarUrl: {
            publicUrl: '',
            signedUrl: '',
            file: null,
            previewUrl: project.avatarUrl ?? undefined,
          },
          bannerUrl: {
            publicUrl: '',
            signedUrl: '',
            file: null,
            previewUrl: project.bannerUrl ?? undefined,
          },
          availableToParticipate: {
            ...state.editProjectFormSteps.cover.availableToParticipate,
            availableDays: allDaysIsSelected
              ? WEEKDAYS
              : WEEKDAYS.filter((day) => {
                  return project.availableDays.some(
                    (availableDay) => availableDay === day.label,
                  )
                }),
          },
        },
        job: {
          ...state.editProjectFormSteps.job,
          projectId: project.projectId,
          roleItens: project.roleItens,
          projectName: project.projectName,
          roles:
            [
              ...project.roles,
              {
                roleId: '',
                name: 'default',
                membersAmount: 0,
                description: '',
              },
            ] ?? state.editProjectFormSteps.job.roles,
          currentProjectJobTab: project.roles
            ? project.roles[0].name
            : 'default',
        },
      },
    }))

    initializer.current = true
  }

  return null
}
