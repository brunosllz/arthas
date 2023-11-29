/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable no-new */
'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { externalApi } from '@/libs/fetch-api'
import { useBoundStore } from '@/store'
import axios from 'axios'
import Compressor from 'compressorjs'
import { destroyCookie } from 'nookies'
import { ButtonHTMLAttributes } from 'react'
import { NEW_PROJECT_COOKIES_ID } from '../../layout'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton(props: SubmitButtonProps) {
  const { newProjectFormSteps, resetNewProjectForm } = useBoundStore(
    ({ newProjectFormSteps, resetNewProjectForm }) => ({
      newProjectFormSteps,
      resetNewProjectForm,
    }),
  )
  const router = useRouter()

  async function handleSubmitNewProject() {
    try {
      useBoundStore.setState(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          job: {
            ...newProjectFormSteps.job,
            submitIsLoading: true,
          },
        },
      }))

      await Promise.all([
        new Promise((resolve) => {
          if (newProjectFormSteps.cover.avatarUrl) {
            new Compressor(newProjectFormSteps.cover.avatarUrl.file, {
              quality: 0.6,
              convertSize: 10000,
              success(file) {
                resolve(
                  useBoundStore.setState(({ newProjectFormSteps }) => ({
                    newProjectFormSteps: {
                      ...newProjectFormSteps,
                      cover: {
                        ...newProjectFormSteps.cover,
                        avatarUrl: {
                          ...newProjectFormSteps.cover.avatarUrl,
                          previewUrl:
                            newProjectFormSteps.cover.avatarUrl?.previewUrl ??
                            '',
                          publicUrl:
                            newProjectFormSteps.cover.avatarUrl?.publicUrl ??
                            '',
                          signedUrl:
                            newProjectFormSteps.cover.avatarUrl?.signedUrl ??
                            '',
                          file: file as File,
                        },
                      },
                    },
                  })),
                )
              },
            })
          }

          return resolve(true)
        }),
        new Promise((resolve) => {
          if (newProjectFormSteps.cover.bannerUrl) {
            new Compressor(newProjectFormSteps.cover.bannerUrl.file, {
              quality: 0.6,
              convertSize: 10000,
              success(file) {
                resolve(
                  useBoundStore.setState(({ newProjectFormSteps }) => ({
                    newProjectFormSteps: {
                      ...newProjectFormSteps,
                      cover: {
                        ...newProjectFormSteps.cover,
                        bannerUrl: {
                          ...newProjectFormSteps.cover.bannerUrl,
                          previewUrl:
                            newProjectFormSteps.cover.bannerUrl?.previewUrl ??
                            '',
                          publicUrl:
                            newProjectFormSteps.cover.bannerUrl?.publicUrl ??
                            '',
                          signedUrl:
                            newProjectFormSteps.cover.bannerUrl?.signedUrl ??
                            '',
                          file: file as File,
                        },
                      },
                    },
                  })),
                )
              },
            })
          }

          resolve(true)
        }),
      ])

      const response = await externalApi('/projects', {
        method: 'POST',
        body: JSON.stringify({
          bannerUrl: newProjectFormSteps.cover.bannerUrl?.publicUrl,
          imageUrl: newProjectFormSteps.cover.avatarUrl?.publicUrl,
          name: newProjectFormSteps.cover.name,
          availableToParticipate: {
            availableDays:
              newProjectFormSteps.cover.availableToParticipate.availableDays
                .filter((day) => day.value !== 'all')
                .map((day) => Number(day.value)),
            availableTime: {
              value:
                newProjectFormSteps.cover.availableToParticipate.availableTime
                  .value,
              unit: newProjectFormSteps.cover.availableToParticipate
                .availableTime.unit,
            },
          },
          description: newProjectFormSteps.description.projectDescription,
          generalSkills: newProjectFormSteps.description.skills?.map(
            (skill) => ({
              slug: skill,
            }),
          ),
          roles: newProjectFormSteps.job.roles
            ?.filter((role) => role.name !== 'default')
            .map((role) => ({
              membersAmount: role.membersAmount,
              name: role.name,
              description: role.description,
            })),
        }),
      })

      if (!response.ok) {
        const error = await response.json()

        console.error(error)

        useBoundStore.setState(({ newProjectFormSteps }) => ({
          newProjectFormSteps: {
            ...newProjectFormSteps,
            job: {
              ...newProjectFormSteps.job,
              submitIsLoading: false,
            },
          },
        }))

        return toast({
          title: 'Ocorreu um error ao cria o seu projeto.',
          description: `Tente novamente mais tarde.`,
          variant: 'destructive',
        })
      }

      await Promise.all([
        axios.put(
          useBoundStore.getState().newProjectFormSteps.cover.avatarUrl
            ?.signedUrl!,
          useBoundStore.getState().newProjectFormSteps.cover.avatarUrl?.file!,
          {
            headers: {
              'Content-Type':
                useBoundStore.getState().newProjectFormSteps.cover.avatarUrl
                  ?.file.type,
            },
          },
        ),
        axios.put(
          useBoundStore.getState().newProjectFormSteps.cover.bannerUrl
            ?.signedUrl!,
          useBoundStore.getState().newProjectFormSteps.cover.bannerUrl?.file!,
          {
            headers: {
              'Content-Type':
                useBoundStore.getState().newProjectFormSteps.cover.bannerUrl
                  ?.file.type,
            },
          },
        ),
      ])

      router.push('/me/projects')
      destroyCookie(null, NEW_PROJECT_COOKIES_ID)
      resetNewProjectForm()
    } catch (error) {
      console.error(error)

      return toast({
        title: 'Ocorreu um error ao cria o seu projeto.',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Button
      disabled={
        !newProjectFormSteps.job.isValidToSubmit ||
        newProjectFormSteps.job.submitIsLoading
      }
      onClick={handleSubmitNewProject}
      className="w-[11.6875rem]"
      size="lg"
      type="button"
      {...props}
    >
      {newProjectFormSteps.job.submitIsLoading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  )
}
