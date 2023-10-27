'use client'

import { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import {
  InputControl,
  InputMessageError,
  InputPrefix,
  InputRoot,
} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const nextStepInput = z.object({
  slugProfile: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
})

type NextStepInput = z.infer<typeof nextStepInput>

export function FirstStepForm() {
  const { addUserInfos, user } = useBoundStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NextStepInput>({
    resolver: zodResolver(nextStepInput),
  })

  function nextStepSubmit() {
    router.push('/onboarding/step-2')
  }

  function onChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    addUserInfos({
      [name]: value,
    })
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
            defaultValue={user.slugProfile}
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
        <Label htmlFor="avatarUrl">Selecione sua foto de perfil</Label>

        <InputRoot>
          <InputControl id="avatarUrl" placeholder="Carregar foto" />
        </InputRoot>
      </div>

      <div className="space-y-3">
        <Label htmlFor="name">Nome completo *</Label>

        <InputRoot hasError={!!errors.name}>
          <InputControl
            id="name"
            defaultValue={user.name}
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
            defaultValue={user.title}
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

      <Button size="xl" className="w-full font-semibold">
        Avançar
      </Button>
    </form>
  )
}
