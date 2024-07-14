/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBoundStore } from '@/store'
import { useDropzone } from 'react-dropzone'
import { api, externalApi } from '@/libs/fetch-api'

import {
  InputControl,
  InputMessageError,
  InputRoot,
} from '@/components/ui/input'
import { InputTracker } from '@/app/(app)/me/components/input-tracker'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { DoubtBox } from '@/components/doubt-box'
import { Card, CardContent } from '@/components/ui/card'
import { MultiSelectInput } from './components/multi-select-input'

import { Loader2, Plus, X } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import Compressor from 'compressorjs'
import { useRouter } from 'next/navigation'
import { makeSlugFromText } from '@/utils/make-slug-from-text'

const coverFormInput = z.object({
  projectId: z.string(),
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
      unit: z.enum(['hour', 'minute']).default('hour'),
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

type CoverFormProps = {
  projectId: string
  name: string
  bannerUrl?: string
  avatarUrl?: string
  availableToParticipate: {
    availableTime: {
      value: number
      unit: 'hour' | 'minute'
    }
  }
  isProjectAuthorOrOwner: boolean
}

export function CoverForm(props: CoverFormProps) {
  const router = useRouter()
  const { deleteEditProjectWeekDaysFromCover, editProjectFormSteps } =
    useBoundStore(
      ({ deleteEditProjectWeekDaysFromCover, editProjectFormSteps }) => ({
        deleteEditProjectWeekDaysFromCover,
        editProjectFormSteps,
      }),
    )

  const form = useForm<CoverFormInput>({
    resolver: zodResolver(coverFormInput),
    defaultValues: {
      projectId: props.projectId,
      name: props.name,
      bannerUrl: editProjectFormSteps.cover.bannerUrl?.previewUrl,
      avatarUrl: editProjectFormSteps.cover.avatarUrl?.previewUrl,
      availableToParticipate: {
        availableDays:
          editProjectFormSteps.cover.availableToParticipate.availableDays,
        availableTime: {
          value: props.availableToParticipate.availableTime.value,
          unit: props.availableToParticipate.availableTime.unit,
        },
      },
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: {
      errors,
      isValid: coverFormIsValid,
      isSubmitting: coverFormIsSubmitting,
    },
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
      editProjectFormSteps.cover.avatarUrlIsLoading ||
      coverFormIsSubmitting ||
      !props.isProjectAuthorOrOwner,
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

      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
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

      setValue('bannerUrl', publicUrl)

      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
            bannerUrl: {
              previewUrl,
              file: acceptedFiles[0],
              publicUrl,
              signedUrl,
            },
          },
        },
      }))

      await new Promise((resolve) => {
        new Compressor(
          useBoundStore.getState().editProjectFormSteps.cover.bannerUrl?.file!,
          {
            quality: 0.6,
            convertSize: 10000,
            success(file) {
              resolve(
                useBoundStore.setState(({ editProjectFormSteps }) => ({
                  editProjectFormSteps: {
                    ...editProjectFormSteps,
                    cover: {
                      ...editProjectFormSteps.cover,
                      bannerUrl: {
                        ...editProjectFormSteps.cover.bannerUrl,
                        previewUrl:
                          editProjectFormSteps.cover.bannerUrl?.previewUrl ??
                          '',
                        publicUrl:
                          editProjectFormSteps.cover.bannerUrl?.publicUrl ?? '',
                        signedUrl:
                          editProjectFormSteps.cover.bannerUrl?.signedUrl ?? '',
                        file: file as File,
                      },
                      bannerUrlIsLoading: false,
                    },
                  },
                })),
              )
            },
          },
        )
      })
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
      editProjectFormSteps.cover.avatarUrlIsLoading ||
      coverFormIsSubmitting ||
      !props.isProjectAuthorOrOwner,
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

      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
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

      setValue('avatarUrl', publicUrl)

      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          cover: {
            ...editProjectFormSteps.cover,
            avatarUrl: {
              previewUrl,
              file: acceptedFiles[0],
              publicUrl,
              signedUrl,
            },
          },
        },
      }))

      await new Promise((resolve) => {
        new Compressor(
          useBoundStore.getState().editProjectFormSteps.cover.avatarUrl?.file!,
          {
            quality: 0.6,
            convertSize: 10000,
            success(file) {
              resolve(
                useBoundStore.setState(({ editProjectFormSteps }) => ({
                  editProjectFormSteps: {
                    ...editProjectFormSteps,
                    cover: {
                      ...editProjectFormSteps.cover,
                      avatarUrl: {
                        ...editProjectFormSteps.cover.avatarUrl,
                        previewUrl:
                          editProjectFormSteps.cover.avatarUrl?.previewUrl ??
                          '',
                        publicUrl:
                          editProjectFormSteps.cover.avatarUrl?.publicUrl ?? '',
                        signedUrl:
                          editProjectFormSteps.cover.avatarUrl?.signedUrl ?? '',
                        file: file as File,
                      },
                      avatarUrlIsLoading: false,
                    },
                  },
                })),
              )
            },
          },
        )
      })
    },
  })

  async function handleCoverFormSubmit(data: CoverFormInput) {
    try {
      const bannerHasBeenChanged =
        data.bannerUrl !== props.bannerUrl &&
        useBoundStore.getState().editProjectFormSteps.cover.bannerUrl

      if (bannerHasBeenChanged) {
        await axios.put(
          useBoundStore.getState().editProjectFormSteps.cover.bannerUrl
            ?.signedUrl!,
          useBoundStore.getState().editProjectFormSteps.cover.bannerUrl?.file!,
          {
            headers: {
              'Content-Type':
                useBoundStore.getState().editProjectFormSteps.cover.bannerUrl
                  ?.file?.type,
            },
          },
        )
      }

      const avatarHasBeenChanged =
        data.avatarUrl !== props.avatarUrl &&
        useBoundStore.getState().editProjectFormSteps.cover.avatarUrl

      if (avatarHasBeenChanged) {
        await axios.put(
          useBoundStore.getState().editProjectFormSteps.cover.avatarUrl
            ?.signedUrl!,
          useBoundStore.getState().editProjectFormSteps.cover.avatarUrl?.file!,
          {
            headers: {
              'Content-Type':
                useBoundStore.getState().editProjectFormSteps.cover.avatarUrl
                  ?.file?.type,
            },
          },
        )
      }

      const response = await externalApi(`/projects/${data.projectId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: data.name,
          imageUrl: data.avatarUrl,
          bannerUrl: data.bannerUrl,
          availableToParticipate: {
            availableDays: data.availableToParticipate.availableDays.map(
              (day) => day.value,
            ),
            availableTime: {
              value: data.availableToParticipate.availableTime.value,
              unit: data.availableToParticipate.availableTime.unit,
            },
          },
        }),
      })

      if (!response.ok) {
        if (response.status === 409) {
          return toast({
            title: 'Ocorreu um error ao salvar suas informações do projeto',
            description: (
              <span>
                Você já possui um projeto com este nome{' '}
                <span className="font-semibold">{data.name}.</span>
              </span>
            ),
            variant: 'destructive',
          })
        }

        return toast({
          title: 'Ocorreu um error ao salvar suas informações do projeto',
          description: `Tente novamente mais tarde.`,
          variant: 'destructive',
        })
      }

      const nameHasBeenChanged = data.name !== props.name
      if (nameHasBeenChanged) {
        router.replace(`/me/project/${makeSlugFromText(data.name)}`)
      }

      return toast({
        title: 'Informações atualizadas',
        description: `Suas informações do projeto ${data.name} foram atualizadas com sucesso.`,
        variant: 'default',
      })
    } catch (error) {
      console.error(error)

      return toast({
        title: 'Ocorreu um error ao salvar suas informações do projeto',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  }

  const allDaysOfWeekIsChecked = useBoundStore
    .getState()
    .editProjectFormSteps.cover.availableToParticipate.availableDays.some(
      (day) => day.value === 'all',
    )

  const weekDaysSelected = allDaysOfWeekIsChecked
    ? useBoundStore
        .getState()
        .editProjectFormSteps.cover.availableToParticipate.availableDays.filter(
          (day) => day.value === 'all',
        )
    : useBoundStore
        .getState()
        .editProjectFormSteps.cover.availableToParticipate.availableDays.sort(
          (a, b) => Number(a.value) - Number(b.value),
        )

  return (
    <div className="flex flex-col items-end gap-9">
      <Card className="w-full">
        <CardContent>
          <FormProvider {...form}>
            <form
              id="cover-form"
              className="space-y-6 odd:pt-6 "
              onSubmit={handleSubmit(handleCoverFormSubmit)}
            >
              <div className="space-y-3">
                <InputTracker>
                  <Label htmlFor="banner">Banner</Label>

                  {editProjectFormSteps.cover.bannerUrl?.previewUrl ? (
                    <div
                      id="banner-container"
                      data-is-dragging={isDragActiveBanner}
                      className="relative flex h-[8.5rem] w-full items-center justify-center overflow-hidden rounded-md focus:ring-1 focus:ring-ring"
                      {...getRootPropsBanner()}
                    >
                      <Image
                        data-is-dragging={isDragActiveBanner}
                        className="h-full w-full object-cover data-[is-dragging=true]:opacity-60"
                        src={editProjectFormSteps.cover.bannerUrl?.previewUrl}
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
                      ) : editProjectFormSteps.cover.bannerUrlIsLoading ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <Plus size={24} />
                      )}

                      <input
                        type="file"
                        {...getInputPropsBanner({ id: 'banner' })}
                      />
                    </div>
                  )}
                </InputTracker>

                {errors.bannerUrl && (
                  <InputMessageError>
                    {errors.bannerUrl.message}
                  </InputMessageError>
                )}

                {editProjectFormSteps.cover.bannerUrl?.previewUrl && (
                  <Button
                    type="button"
                    size="sm"
                    disabled={
                      editProjectFormSteps.cover.bannerUrlIsLoading ||
                      coverFormIsSubmitting ||
                      !props.isProjectAuthorOrOwner
                    }
                    variant="outline"
                    {...getRootPropsBanner()}
                  >
                    Alterar banner
                  </Button>
                )}

                <span className="mt-3 block text-sm text-muted-foreground">
                  Resolução recomendada 739 x 136 pixels (tamanho máximo de
                  10MB).
                </span>
              </div>

              <Separator />

              <InputTracker className="flex items-end gap-4 space-y-3">
                <div className="space-y-3.5">
                  <Label htmlFor="avatar">Avatar</Label>

                  <div className="flex items-end gap-3">
                    {editProjectFormSteps.cover.avatarUrl?.previewUrl ? (
                      <div
                        id="avatar-container"
                        data-is-dragging={isDragActiveAvatar}
                        className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-md focus:ring-1 focus:ring-ring"
                        {...getRootPropsAvatar()}
                      >
                        <Image
                          data-is-dragging={isDragActiveAvatar}
                          className="h-28 w-full object-cover data-[is-dragging=true]:opacity-60"
                          src={editProjectFormSteps.cover.avatarUrl?.previewUrl}
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
                        {editProjectFormSteps.cover.avatarUrlIsLoading ? (
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

                    {editProjectFormSteps.cover.avatarUrl?.previewUrl && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={
                          editProjectFormSteps.cover.avatarUrlIsLoading ||
                          coverFormIsSubmitting ||
                          !props.isProjectAuthorOrOwner
                        }
                        {...getRootPropsAvatar()}
                      >
                        Alterar avatar
                      </Button>
                    )}
                  </div>

                  {errors.avatarUrl && (
                    <InputMessageError>
                      {errors.avatarUrl.message}
                    </InputMessageError>
                  )}

                  <span className="mt-3 block text-sm text-muted-foreground">
                    Resolução recomendada 112 x 112 pixels (tamanho máximo de
                    8MB).
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
                      disabled={
                        coverFormIsSubmitting || !props.isProjectAuthorOrOwner
                      }
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

                    {props.isProjectAuthorOrOwner && (
                      <DoubtBox>
                        <span className="text-xs leading-normal">
                          Você deve informar até 8 horas por dia.
                        </span>
                      </DoubtBox>
                    )}
                  </div>

                  <div className="flex w-full items-start gap-[1.125rem] pt-1.5">
                    <div className="w-full space-y-1">
                      <MultiSelectInput
                        emptyMessage="Não foi possível encontrar o dia da semana."
                        placeholder="Dias da semana"
                        disabled={!props.isProjectAuthorOrOwner}
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
                          disabled={
                            coverFormIsSubmitting ||
                            !props.isProjectAuthorOrOwner
                          }
                          type="number"
                          {...register(
                            'availableToParticipate.availableTime.value',
                            {
                              valueAsNumber: true,
                            },
                          )}
                        />
                      </InputRoot>

                      {errors.availableToParticipate?.availableTime?.value && (
                        <InputMessageError>
                          {
                            errors.availableToParticipate?.availableTime.value
                              .message
                          }
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
                            className="disabled:cursor-not-allowed"
                            disabled={
                              coverFormIsSubmitting ||
                              !props.isProjectAuthorOrOwner
                            }
                            onClick={() => {
                              deleteEditProjectWeekDaysFromCover(param.value)
                              setValue(
                                'availableToParticipate.availableDays',
                                useBoundStore.getState().editProjectFormSteps
                                  .cover.availableToParticipate.availableDays,
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

              <input className="hidden" {...register('projectId')} />
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {props.isProjectAuthorOrOwner && (
        <Button
          disabled={!coverFormIsValid || coverFormIsSubmitting}
          form="cover-form"
          className="ml-auto w-[12.375rem]"
          size="lg"
          type="submit"
        >
          {coverFormIsSubmitting ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            'Salvar alterações'
          )}
        </Button>
      )}
    </div>
  )
}
