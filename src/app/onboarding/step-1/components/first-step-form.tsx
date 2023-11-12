'use client'

import { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  InputControl,
  InputMessageError,
  InputPrefix,
  InputRoot,
} from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Loader2, Upload } from 'lucide-react'

const nextStepInput = z.object({
  slugProfile: z.string().min(1, { message: 'Informe a url do seu perfil.' }),
  name: z.string().min(1, { message: 'Informe o seu nome completo.' }),
  title: z.string().min(1, { message: 'Informe o título do seu perfil.' }),
})

type NextStepInput = z.infer<typeof nextStepInput>

export function FirstStepForm() {
  const { setUser, user, cropAvatarImageStatus } = useBoundStore(
    ({ user, setUser, cropAvatarImageStatus }) => {
      return {
        user,
        setUser,
        cropAvatarImageStatus,
      }
    },
  )
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting: nextStepFormIsSubmitting },
  } = useForm<NextStepInput>({
    resolver: zodResolver(nextStepInput),
    defaultValues: {
      name: user.name,
      slugProfile: user.slugProfile,
      title: user.title,
    },
  })

  function nextStepSubmit() {
    router.push('/onboarding/step-2')
  }

  function onChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    if (name === 'slugProfile') {
      const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

      setValue('slugProfile', valueChanged)

      return setUser({
        [name]: valueChanged,
      })
    }

    setUser({
      [name]: value,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      if (image) {
        const imagePreviewURL = URL.createObjectURL(image)

        useBoundStore.setState({
          croppedAvatarImagePreviewURL: imagePreviewURL,
          cropAvatarImageStatus: 'cropping',
        })
      }
    }
  }

  useEffect(() => {
    useBoundStore.setState({
      animatedBrowser: {
        x: 0,
        y: 0,
        scale: 1,
      },
    })
  }, [])

  const isCroppingAvatarImage =
    cropAvatarImageStatus === 'cropping' || cropAvatarImageStatus === 'loading'

  return (
    <form
      className="mt-[2.625rem] space-y-6"
      onSubmit={handleSubmit(nextStepSubmit)}
    >
      <div className="space-y-3">
        <Label htmlFor="slugProfile">URL do perfil *</Label>

        <InputRoot hasError={!!errors.slugProfile}>
          <InputPrefix>devxperience.app/</InputPrefix>
          <InputControl
            id="slugProfile"
            disabled={nextStepFormIsSubmitting || isCroppingAvatarImage}
            placeholder="john-doe"
            className="pl-2"
            {...register('slugProfile', {
              required: true,
              onChange: (event) => onChangeInputValue(event),
            })}
          />
        </InputRoot>

        {errors.slugProfile && (
          <InputMessageError>{errors.slugProfile.message}</InputMessageError>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="avatarUrl">
          Selecione sua foto de perfil
          <div className="mt-3 flex h-[3.25rem] cursor-pointer items-center justify-between rounded-md border border-input px-4 text-muted-foreground shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <span>Carregar do computador</span>
            <Upload size={16} />

            <input
              id="avatarUrl"
              type="file"
              disabled={nextStepFormIsSubmitting || isCroppingAvatarImage}
              className="sr-only"
              onChange={handleFileChange}
              multiple={false}
            />
          </div>
        </Label>
      </div>

      <div className="space-y-3">
        <Label htmlFor="name">Nome completo *</Label>

        <InputRoot hasError={!!errors.name}>
          <InputControl
            id="name"
            disabled={nextStepFormIsSubmitting || isCroppingAvatarImage}
            placeholder="John doe"
            {...register('name', {
              required: true,
              onChange: (event) => onChangeInputValue(event),
            })}
          />
        </InputRoot>

        {errors.name && (
          <InputMessageError>{errors.name.message}</InputMessageError>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="title">Titulo do perfil *</Label>

        <InputRoot hasError={!!errors.title}>
          <InputControl
            id="title"
            disabled={nextStepFormIsSubmitting || isCroppingAvatarImage}
            placeholder="CEO at Dev Xperience"
            {...register('title', {
              required: true,
              onChange: (event) => onChangeInputValue(event),
            })}
          />
        </InputRoot>

        {errors.title && (
          <InputMessageError>{errors.title.message}</InputMessageError>
        )}
      </div>

      <Button
        size="xl"
        className="w-full font-semibold"
        disabled={nextStepFormIsSubmitting || isCroppingAvatarImage}
      >
        {nextStepFormIsSubmitting ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          'Avançar'
        )}
      </Button>
    </form>
  )
}
