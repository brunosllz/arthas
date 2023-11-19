'use client'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AboutMeTextArea } from './about-me-text-area'
import { SkillsInput } from './skills-input'
import { Loader2 } from 'lucide-react'

const thirdStepInput = z.object({
  aboutMe: z
    .string()
    .max(1200, { message: 'Limite máximo de 1200 caracteres.' })
    .optional(),
  skills: z.array(z.string(), { required_error: 'Select a technology' }),
})

export type ThirdStepInput = z.infer<typeof thirdStepInput>

export function ThirdStepForm() {
  const { saveUser, saveUserSubmitIsLoading } = useBoundStore(
    ({ saveUser, saveUserSubmitIsLoading }) => {
      return {
        saveUser,
        saveUserSubmitIsLoading,
      }
    },
  )
  const [submitLeaveForLateIsLoading, setSubmitLeaveForLateIsLoading] =
    useState(false)
  const router = useRouter()

  const form = useForm<ThirdStepInput>({
    resolver: zodResolver(thirdStepInput),
  })

  const { handleSubmit } = form

  async function nextStepSubmit() {
    await saveUser({})
    router.push('/onboarding/welcome')
  }

  async function leaveForLater() {
    setSubmitLeaveForLateIsLoading(true)

    await saveUser({ leaveForLate: true })
    router.push('/onboarding/welcome')
  }

  useEffect(() => {
    useBoundStore.setState({
      animatedBrowser: {
        scale: 0.62,
        x: -220,
        y: -180,
      },
    })
  }, [])

  return (
    <FormProvider {...form}>
      <form
        className="mt-[2.625rem] space-y-6"
        onSubmit={handleSubmit(nextStepSubmit)}
      >
        <div className="space-y-3.5">
          <Label htmlFor="aboutMe">Sobre</Label>

          <AboutMeTextArea
            editable={!saveUserSubmitIsLoading || !submitLeaveForLateIsLoading}
          />
        </div>

        <div className="space-y-3.5">
          <Label htmlFor="technologies">Habilidades</Label>

          <SkillsInput
            disabled={saveUserSubmitIsLoading || submitLeaveForLateIsLoading}
          />
        </div>

        <div className="space-y-5">
          <Button
            className="w-full"
            disabled={saveUserSubmitIsLoading || submitLeaveForLateIsLoading}
          >
            {saveUserSubmitIsLoading || submitLeaveForLateIsLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Avançar'
            )}
          </Button>

          <Button
            className="w-full"
            variant="outline"
            disabled={saveUserSubmitIsLoading || submitLeaveForLateIsLoading}
            type="button"
            onClick={leaveForLater}
          >
            {saveUserSubmitIsLoading || submitLeaveForLateIsLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Deixar para depois'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
