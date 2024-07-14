import { StateCreator } from 'zustand'

export type NewProjectSlice = {
  newProjectFormSteps: {
    cover: {
      bannerUrl?: {
        previewUrl: string
        file: File
        signedUrl: string
        publicUrl: string
      }
      avatarUrl?: {
        previewUrl: string
        file: File
        signedUrl: string
        publicUrl: string
      }
      name?: string
      availableToParticipate: {
        availableDays: Array<{
          value: string
          label: string
        }>
        availableTime: {
          value?: number
          unit: 'hour' | 'minute'
        }
      }
      isValidToSubmit: boolean
      submitIsLoading: boolean
      bannerUrlIsLoading: boolean
      avatarUrlIsLoading: boolean
    }
    description: {
      projectDescription?: string
      skills?: string[]
      isValidToSubmit: boolean
      submitIsLoading: boolean
    }
    job: {
      roles?: Array<{
        roleId: string
        membersAmount: number
        name: string
        description: string
      }>
      roleItens: Array<{ value: string; label: string }>
      currentProjectJobTab: string
      newProjectJobIsValid: boolean
      isValidToSubmit: boolean
      submitIsLoading: boolean
    }
  }
  resetNewProjectForm: () => void
  toggleNewProjectWeekDaysFromCover: ({
    value,
    label,
  }: {
    value: string
    label: string
  }) => void
  deleteNewProjectWeekDaysFromCover: (dayValue: string) => void
  deleteNewProjectRoleFromJob: (roleId: string) => void
}

const createNewProjectSlice: StateCreator<NewProjectSlice> = (set, get) => ({
  newProjectFormSteps: {
    cover: {
      submitIsLoading: false,
      isValidToSubmit: false,
      availableToParticipate: {
        availableDays: [],
        availableTime: {
          unit: 'hour',
          value: undefined,
        },
      },
      bannerUrlIsLoading: false,
      avatarUrlIsLoading: false,
    },
    description: {
      submitIsLoading: false,
      isValidToSubmit: false,
    },
    job: {
      roles: [
        {
          roleId: '',
          name: 'default',
          membersAmount: 0,
          description: '',
        },
      ],
      submitIsLoading: false,
      isValidToSubmit: false,
      currentProjectJobTab: 'default',
      newProjectJobIsValid: false,
      roleItens: [],
    },
  },
  toggleNewProjectWeekDaysFromCover: ({ label, value }) => {
    const isSelectedParam =
      get().newProjectFormSteps.cover.availableToParticipate.availableDays.some(
        (day) => day.value === value,
      )

    if (isSelectedParam) {
      return set(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          cover: {
            ...newProjectFormSteps.cover,
            availableToParticipate: {
              ...newProjectFormSteps.cover.availableToParticipate,
              availableDays:
                newProjectFormSteps.cover.availableToParticipate.availableDays.filter(
                  (day) => day.value !== value,
                ),
            },
          },
        },
      }))
    }

    set(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        cover: {
          ...newProjectFormSteps.cover,
          availableToParticipate: {
            ...newProjectFormSteps.cover.availableToParticipate,
            availableDays: [
              ...newProjectFormSteps.cover.availableToParticipate.availableDays,
              {
                label,
                value,
              },
            ],
          },
        },
      },
    }))
  },
  deleteNewProjectWeekDaysFromCover: (dayValue: string) => {
    set(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        cover: {
          ...newProjectFormSteps.cover,
          availableToParticipate: {
            ...newProjectFormSteps.cover.availableToParticipate,
            availableDays:
              dayValue === 'all'
                ? []
                : newProjectFormSteps.cover.availableToParticipate.availableDays.filter(
                    (day) => day.value !== dayValue,
                  ),
          },
        },
      },
    }))
  },
  deleteNewProjectRoleFromJob: (roleId: string) => {
    const hasJustOneRole =
      get().newProjectFormSteps.job.roles &&
      get().newProjectFormSteps.job.roles?.length === 1

    const roles = get().newProjectFormSteps.job.roles

    if (roles) {
      const roleIndex = roles.findIndex((role) => role.roleId === roleId)

      set(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          job: {
            ...newProjectFormSteps.job,
            roles: roles.filter((role) => role.roleId !== roleId),
            currentProjectJobTab: hasJustOneRole
              ? 'default'
              : roles[
                  roleIndex + 1 === roles.length ? roleIndex - 1 : roleIndex + 1
                ].name,
          },
        },
      }))
    }
  },
  resetNewProjectForm: () => {
    set({
      newProjectFormSteps: {
        cover: {
          submitIsLoading: false,
          isValidToSubmit: false,
          availableToParticipate: {
            availableDays: [],
            availableTime: {
              unit: 'hour',
              value: undefined,
            },
          },
          bannerUrlIsLoading: false,
          avatarUrlIsLoading: false,
        },
        description: {
          submitIsLoading: false,
          isValidToSubmit: false,
        },
        job: {
          roles: [
            {
              roleId: '',
              name: 'default',
              membersAmount: 0,
              description: '',
            },
          ],
          submitIsLoading: false,
          isValidToSubmit: false,
          currentProjectJobTab: 'default',
          newProjectJobIsValid: false,
          roleItens: [],
        },
      },
    })
  },
})

export { createNewProjectSlice }
