'use client'

import { useEffect, useId } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBoundStore } from '@/store'
import { useDropzone } from 'react-dropzone'
import { setCookie } from 'nookies'

import {
  InputControl,
  InputMessageError,
  InputRoot,
} from '@/components/ui/input'
import { InputTracker } from '../../components/input-tracker'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { MultiSelectInput } from './multi-select-input'

import { Loader2, Plus, X } from 'lucide-react'
import { NEW_PROJECT_COOKIES_ID } from '../../layout'
import { api } from '@/libs/fetch-api'
import { DoubtBox } from '@/components/doubt-box'

const coverFormInput = z.object({
  name: z
    .string({ required_error: 'O nome do projeto é obrigatório.' })
    .min(2, { message: 'O nome do projeto deve ter no mínimo 2 caracteres.' }),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  availableToParticipate: z.object({
    availableDays: z
      .array(z.object({ value: z.string(), label: z.string() }), {
        required_error: 'Selecione um dia da semana.',
      })
      .min(1, {
        message: 'Você deve selecionar pelo menos um dia da semana.',
      }),
    availableTime: z.object({
      value: z.coerce
        .number({
          invalid_type_error: 'Você deve informar um número.',
          required_error: 'Informe quantas horas são necessário.',
        })
        .min(1, 'Você deve informar no mínimo 1 hora')
        .max(9, 'Você deve informar no máximo 8 horas por dia'),
      unit: z.enum(['hours']).default('hours'),
    }),
  }),
})

export type CoverFormInput = z.infer<typeof coverFormInput>

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

export function CoverForm() {
  const router = useRouter()
  const formId = useId()
  const { deleteWeekDatFromCover, newProjectFormSteps } = useBoundStore(
    ({ deleteWeekDatFromCover, newProjectFormSteps }) => ({
      deleteWeekDatFromCover,
      newProjectFormSteps,
    }),
  )

  const form = useForm<CoverFormInput>({
    resolver: zodResolver(coverFormInput),
    defaultValues: {
      name: useBoundStore.getState().newProjectFormSteps.cover.name,
      bannerUrl:
        useBoundStore.getState().newProjectFormSteps.cover.bannerUrl
          ?.previewUrl,
      avatarUrl:
        useBoundStore.getState().newProjectFormSteps.cover.avatarUrl
          ?.previewUrl,
      availableToParticipate: {
        availableDays:
          useBoundStore.getState().newProjectFormSteps.cover
            .availableToParticipate.availableDays,
        availableTime: {
          value:
            useBoundStore.getState().newProjectFormSteps.cover
              .availableToParticipate.availableTime.value,
          unit: 'hours',
        },
      },
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = form

  const {
    getInputProps: getInputPropsBanner,
    isDragActive: isDragActiveBanner,
    getRootProps: getRootPropsBanner,
  } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg+xml'],
    },
    maxSize: 10485760,
    disabled:
      newProjectFormSteps.cover.avatarUrlIsLoading ||
      newProjectFormSteps.cover.submitIsLoading,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      const fileErrors = rejectedFiles[0]?.errors[0]

      if (fileErrors) {
        switch (fileErrors.code) {
          case 'file-too-large':
            return setError('bannerUrl', {
              message: 'Você deve enviar um arquivo menor que 10MB.',
            })

          case 'file-invalid-type':
            return setError('bannerUrl', {
              message: 'Este tipo de arquivo não é suportado.',
            })
          default:
            return
        }
      }

      useBoundStore.setState(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          cover: {
            ...newProjectFormSteps.cover,
            bannerUrlIsLoading: true,
          },
        },
      }))

      const previewUrl = URL.createObjectURL(acceptedFiles[0])

      const response = await api('/uploads', {
        method: 'POST',
        body: JSON.stringify({
          fileContentType: 'jpeg',
          uploadPrefix: 'projects',
        }),
      })

      const { signedUrl, publicUrl } = await response.json()

      setValue('bannerUrl', previewUrl)

      useBoundStore.setState(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          cover: {
            ...newProjectFormSteps.cover,
            bannerUrl: {
              previewUrl,
              file: acceptedFiles[0],
              publicUrl,
              signedUrl,
            },
            bannerUrlIsLoading: false,
          },
        },
      }))
    },
  })

  const {
    getInputProps: getInputPropsAvatar,
    isDragActive: isDragActiveAvatar,
    getRootProps: getRootPropsAvatar,
  } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg+xml'],
    },
    maxSize: 8388608,
    disabled:
      newProjectFormSteps.cover.avatarUrlIsLoading ||
      newProjectFormSteps.cover.submitIsLoading,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      const fileErrors = rejectedFiles[0]?.errors[0]

      if (fileErrors) {
        switch (fileErrors.code) {
          case 'file-too-large':
            return setError('avatarUrl', {
              message: 'Você deve enviar um arquivo menor que 8MB.',
            })

          case 'file-invalid-type':
            return setError('avatarUrl', {
              message: 'Este tipo de arquivo não é suportado.',
            })
          default:
            return
        }
      }

      useBoundStore.setState(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          cover: {
            ...newProjectFormSteps.cover,
            avatarUrlIsLoading: true,
          },
        },
      }))

      const previewUrl = URL.createObjectURL(acceptedFiles[0])

      const response = await api('/uploads', {
        method: 'POST',
        body: JSON.stringify({
          fileContentType: 'jpeg',
          uploadPrefix: 'projects',
        }),
      })

      const { signedUrl, publicUrl } = await response.json()

      setValue('avatarUrl', previewUrl)

      useBoundStore.setState(({ newProjectFormSteps }) => ({
        newProjectFormSteps: {
          ...newProjectFormSteps,
          cover: {
            ...newProjectFormSteps.cover,
            avatarUrl: {
              previewUrl,
              file: acceptedFiles[0],
              publicUrl,
              signedUrl,
            },
            avatarUrlIsLoading: false,
          },
        },
      }))
    },
  })

  function handleNextStep(data: CoverFormInput) {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        cover: {
          ...newProjectFormSteps.cover,
          name: data.name,
          availableToParticipate: {
            availableDays: data.availableToParticipate.availableDays,
            availableTime: {
              value: data.availableToParticipate.availableTime.value,
              unit: 'hour',
            },
          },
          submitIsLoading: true,
        },
      },
    }))

    setCookie(null, NEW_PROJECT_COOKIES_ID, JSON.stringify({ cover: formId }), {
      maxAge: 60 * 30, // 30 minutes
      path: '/me/project/new',
    })

    router.push('/me/project/new/description')
  }

  const allDaysOfWeekIsChecked = useBoundStore
    .getState()
    .newProjectFormSteps.cover.availableToParticipate.availableDays.some(
      (day) => day.value === 'all',
    )

  const weekDaysSelected = allDaysOfWeekIsChecked
    ? useBoundStore
        .getState()
        .newProjectFormSteps.cover.availableToParticipate.availableDays.filter(
          (day) => day.value === 'all',
        )
    : useBoundStore
        .getState()
        .newProjectFormSteps.cover.availableToParticipate.availableDays.sort(
          (a, b) => Number(a.value) - Number(b.value),
        )

  useEffect(() => {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        cover: {
          ...newProjectFormSteps.cover,
          isValidToSubmit: isValid,
        },
      },
    }))
  }, [isValid])

  useEffect(() => {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        cover: {
          ...newProjectFormSteps.cover,
          submitIsLoading: false,
        },
      },
    }))

    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', unloadCallback)
    return () => window.removeEventListener('beforeunload', unloadCallback)
  }, [])

  return (
    <FormProvider {...form}>
      <form
        id="cover-form"
        className="space-y-6 odd:pt-6 "
        onSubmit={handleSubmit(handleNextStep)}
      >
        <div className="space-y-3">
          <InputTracker>
            <Label htmlFor="banner">Banner</Label>

            {newProjectFormSteps.cover.bannerUrl ? (
              <div
                id="banner-container"
                data-is-dragging={isDragActiveBanner}
                className="relative flex h-[8.5rem] w-full items-center justify-center overflow-hidden rounded-md focus:ring-1 focus:ring-ring"
                {...getRootPropsBanner()}
              >
                <Image
                  data-is-dragging={isDragActiveBanner}
                  className="h-full w-full object-cover data-[is-dragging=true]:opacity-60"
                  src={newProjectFormSteps.cover.bannerUrl.previewUrl}
                  width={762}
                  height={136}
                  alt="banner preview"
                />

                {isDragActiveBanner && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-sm">Solte o arquivo aqui</span>
                  </div>
                )}
              </div>
            ) : (
              <div
                id="banner-container"
                data-is-dragging={isDragActiveBanner}
                className="flex h-[8.5rem] w-full items-center justify-center rounded-md border border-dashed border-input transition-colors data-[is-dragging=true]:bg-accent focus:ring-1 focus:ring-ring"
                {...getRootPropsBanner()}
              >
                {isDragActiveBanner ? (
                  <span className="text-sm">Solte o arquivo aqui</span>
                ) : newProjectFormSteps.cover.bannerUrlIsLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Plus size={24} />
                )}

                <input type="file" {...getInputPropsBanner({ id: 'banner' })} />
              </div>
            )}
          </InputTracker>

          {errors.bannerUrl && (
            <InputMessageError>{errors.bannerUrl.message}</InputMessageError>
          )}

          {newProjectFormSteps.cover.bannerUrl && (
            <Button
              type="button"
              size="sm"
              disabled={
                newProjectFormSteps.cover.avatarUrlIsLoading ||
                newProjectFormSteps.cover.submitIsLoading
              }
              variant="outline"
              {...getRootPropsBanner()}
            >
              Alterar banner
            </Button>
          )}

          <span className="mt-3 block text-sm text-muted-foreground">
            Resolução recomendada 739 x 136 pixels (tamanho máximo de 10MB).
          </span>
        </div>

        <Separator />

        <InputTracker className="flex items-end gap-4 space-y-3">
          <div className="space-y-3.5">
            <Label htmlFor="avatar">Avatar</Label>

            <div className="flex items-end gap-3">
              {newProjectFormSteps.cover.avatarUrl ? (
                <div
                  id="avatar-container"
                  data-is-dragging={isDragActiveAvatar}
                  className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-md focus:ring-1 focus:ring-ring"
                  {...getRootPropsAvatar()}
                >
                  <Image
                    data-is-dragging={isDragActiveAvatar}
                    className="h-28 w-full object-cover data-[is-dragging=true]:opacity-60"
                    src={newProjectFormSteps.cover.avatarUrl.previewUrl}
                    alt="avatar preview"
                    width={112}
                    height={112}
                  />
                </div>
              ) : (
                <div
                  id="avatar-container"
                  data-is-dragging={isDragActiveAvatar}
                  className="flex h-28 w-28 items-center justify-center rounded-md border border-dashed border-input transition-colors data-[is-dragging=true]:bg-accent focus:ring-1 focus:ring-ring"
                  {...getRootPropsAvatar()}
                >
                  {newProjectFormSteps.cover.avatarUrlIsLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Plus size={24} />
                  )}

                  <input
                    type="file"
                    {...getInputPropsAvatar({
                      id: 'avatar',
                    })}
                  />
                </div>
              )}

              {newProjectFormSteps.cover.avatarUrl && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={
                    newProjectFormSteps.cover.avatarUrlIsLoading ||
                    newProjectFormSteps.cover.submitIsLoading
                  }
                  {...getRootPropsAvatar()}
                >
                  Alterar avatar
                </Button>
              )}
            </div>

            {errors.avatarUrl && (
              <InputMessageError>{errors.avatarUrl.message}</InputMessageError>
            )}

            <span className="mt-3 block text-sm text-muted-foreground">
              Resolução recomendada 112 x 112 pixels (tamanho máximo de 8MB).
            </span>
          </div>
        </InputTracker>

        <Separator />

        <InputTracker>
          <Label htmlFor="name">Nome do projeto</Label>

          <div className="space-y-1">
            <InputRoot>
              <InputControl
                id="name"
                disabled={newProjectFormSteps.cover.submitIsLoading}
                {...register('name')}
                placeholder="Dev Xperience"
              />
            </InputRoot>

            {errors.name && (
              <InputMessageError>{errors.name.message}</InputMessageError>
            )}
          </div>
        </InputTracker>

        <Separator />

        <div>
          <InputTracker className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="availability">Disponibilidade</Label>
              <DoubtBox>
                <span className="text-xs leading-normal">
                  Você deve informar até 8 horas por dia.
                </span>
              </DoubtBox>
            </div>

            <div className="flex w-full items-start gap-[1.125rem] pt-1.5">
              <div className="w-full space-y-1">
                <MultiSelectInput
                  emptyMessage="Não foi possível encontrar o dia da semana."
                  name="week-days"
                  placeholder="Dias da semana"
                  params={WEEKDAYS}
                />

                {errors.availableToParticipate?.availableDays && (
                  <InputMessageError>
                    {errors.availableToParticipate?.availableDays.message}
                  </InputMessageError>
                )}
              </div>

              <div className="w-full space-y-1">
                <InputRoot>
                  <InputControl
                    id="availability"
                    placeholder="2 horas"
                    disabled={newProjectFormSteps.cover.submitIsLoading}
                    type="number"
                    {...register('availableToParticipate.availableTime.value', {
                      valueAsNumber: true,
                    })}
                  />
                </InputRoot>

                {errors.availableToParticipate?.availableTime?.value && (
                  <InputMessageError>
                    {errors.availableToParticipate?.availableTime.value.message}
                  </InputMessageError>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-3">
              {weekDaysSelected.map((param) => {
                return (
                  <Badge
                    key={param.value}
                    size="sm"
                    variant="secondary"
                    className="gap-1"
                  >
                    {param.label}
                    <button
                      type="button"
                      disabled={newProjectFormSteps.cover.submitIsLoading}
                      onClick={() => {
                        deleteWeekDatFromCover(param.value)
                        setValue(
                          'availableToParticipate.availableDays',
                          useBoundStore.getState().newProjectFormSteps.cover
                            .availableToParticipate.availableDays,
                        )
                      }}
                    >
                      <X size={16} />
                    </button>
                  </Badge>
                )
              })}
            </div>
          </InputTracker>
        </div>
      </form>
    </FormProvider>
  )
}
