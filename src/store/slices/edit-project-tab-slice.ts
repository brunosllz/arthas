import { StateCreator } from 'zustand'

export type EditProjectTabSlice = {
  currentFormSelectedFromEditTab: string
  editProjectFormSteps: {
    cover: {
      bannerUrl?: {
        previewUrl: string
        file: File | null
        signedUrl: string
        publicUrl: string
      }
      avatarUrl?: {
        previewUrl: string
        file: File | null
        signedUrl: string
        publicUrl: string
      }
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
      bannerUrlIsLoading: boolean
      avatarUrlIsLoading: boolean
    }
    job: {
      projectId: string
      projectName: string
      roleItens: Array<{ value: string; label: string }>
      roles: Array<{
        roleId: string
        membersAmount: number
        name: string
        description: string
      }>
      currentProjectJobTab: string
      editProjectJobIsValid: boolean
      editProjectJobIsValidToSubmit: boolean
      editProjectJobSubmitIsLoading: boolean
    }
  }
  toggleEditProjectWeekDaysFromCover: ({
    value,
    label,
  }: {
    value: string
    label: string
  }) => void
  deleteEditProjectWeekDaysFromCover: (dayValue: string) => void
  deleteEditProjectRoleFromJob: (roleId: string) => void
}

const createEditProjectTabSlice: StateCreator<EditProjectTabSlice> = (
  set,
  get,
) => ({
  currentFormSelectedFromEditTab: 'cover',
  editProjectFormSteps: {
    cover: {
      availableToParticipate: {
        availableDays: [],
        availableTime: {
          unit: 'hour',
        },
      },
      bannerUrlIsLoading: false,
      avatarUrlIsLoading: false,
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
      projectName: '',
      projectId: '',
      roleItens: [],
      currentProjectJobTab: 'default',
      editProjectJobIsValid: false,
      editProjectJobIsValidToSubmit: false,
      editProjectJobSubmitIsLoading: false,
    },
  },
  toggleEditProjectWeekDaysFromCover: ({ label, value }) => {
    const isSelectedParam =
      get().editProjectFormSteps.cover.availableToParticipate.availableDays.some(
        (day) => day.value === value,
      )

    if (isSelectedParam) {
      return set(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
            availableToParticipate: {
              ...editProjectFormSteps.cover.availableToParticipate,
              availableDays:
                editProjectFormSteps.cover.availableToParticipate.availableDays.filter(
                  (day) => day.value !== value,
                ),
            },
          },
        },
      }))
    }

    set(({ editProjectFormSteps }) => ({
      editProjectFormSteps: {
        ...editProjectFormSteps,
        cover: {
          ...editProjectFormSteps.cover,
          availableToParticipate: {
            ...editProjectFormSteps.cover.availableToParticipate,
            availableDays: [
              ...editProjectFormSteps.cover.availableToParticipate
                .availableDays,
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
  deleteEditProjectWeekDaysFromCover: (dayValue: string) => {
    set(({ editProjectFormSteps }) => ({
      editProjectFormSteps: {
        ...editProjectFormSteps,
        cover: {
          ...editProjectFormSteps.cover,
          availableToParticipate: {
            ...editProjectFormSteps.cover.availableToParticipate,
            availableDays:
              dayValue === 'all'
                ? []
                : editProjectFormSteps.cover.availableToParticipate.availableDays.filter(
                    (day) => day.value !== dayValue,
                  ),
          },
        },
      },
    }))
  },
  deleteEditProjectRoleFromJob: (roleId: string) => {
    const hasJustOneRole =
      get().editProjectFormSteps.job.roles &&
      get().editProjectFormSteps.job.roles?.length === 1

    const roles = get().editProjectFormSteps.job.roles

    if (roles) {
      const roleIndex = roles.findIndex((role) => role.roleId === roleId)

      set(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          job: {
            ...editProjectFormSteps.job,
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
})

export { createEditProjectTabSlice }
