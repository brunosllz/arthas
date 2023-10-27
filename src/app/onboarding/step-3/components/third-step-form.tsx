'use client'

import { ChangeEvent, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AboutMeTextArea } from './about-me-text-area'
import { SkillsInput } from './skills-input'

const thirdStepInput = z.object({
  aboutMe: z.string().optional(),
  skills: z.array(z.string(), { required_error: 'Select a technology' }),
})

export type ThirdStepInput = z.infer<typeof thirdStepInput>

export function ThirdStepForm() {
  const { addUserInfos, user } = useBoundStore()
  const router = useRouter()

  const form = useForm<ThirdStepInput>({
    resolver: zodResolver(thirdStepInput),
  })

  const { handleSubmit } = form

  function nextStepSubmit() {
    router.push('/onboarding/step-3')
  }

  function onChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    addUserInfos({
      [name]: value,
    })
  }

  function onChangeComboboxValue(name: string, value: string) {
    addUserInfos({
      [name]: value,
    })
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

          <AboutMeTextArea />
        </div>

        <div className="space-y-3.5">
          <Label htmlFor="technologies">Habilidades</Label>

          <SkillsInput />
        </div>

        <div className="space-y-5">
          <Button size="xl" className="w-full font-semibold">
            Avançar
          </Button>

          <Button size="xl" className="w-full font-semibold" variant="outline">
            Deixar para depois
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
