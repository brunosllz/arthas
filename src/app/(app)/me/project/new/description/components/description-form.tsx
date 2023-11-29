'use client'

import { useEffect, useId } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputTracker } from '../../components/input-tracker'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DescriptionTextArea } from './description-text-area'
import { SkillsInput } from './skills-input'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { NEW_PROJECT_COOKIES_ID } from '../../layout'
import { DoubtBox } from '@/components/doubt-box'

const descriptionFormInput = z.object({
  description: z
    .string({
      required_error: 'Você deve inserir uma descrição para o projeto.',
    })
    .max(1200, { message: 'Limite máximo de 1200 caracteres.' })
    .min(10, { message: 'Limite mínimo de 10 caracteres.' }),
  skills: z
    .array(z.string(), { required_error: 'Selecione uma habilidade.' })
    .min(1, { message: 'Você deve selecionar pelo menos uma habilidade.' }),
})

export type DescriptionFormInput = z.infer<typeof descriptionFormInput>

export function DescriptionForm() {
  const formId = useId()
  const router = useRouter()
  const form = useForm<DescriptionFormInput>({
    resolver: zodResolver(descriptionFormInput),
    defaultValues: {
      description:
        useBoundStore.getState().newProjectFormSteps.description
          .projectDescription,
      skills:
        useBoundStore.getState().newProjectFormSteps.description.skills ?? [],
    },
  })
  const { newProjectFormSteps } = useBoundStore(({ newProjectFormSteps }) => ({
    newProjectFormSteps,
  }))

  const {
    handleSubmit,
    formState: { isValid },
  } = form

  function handleNextStep(data: DescriptionFormInput) {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        description: {
          ...newProjectFormSteps.description,
          projectDescription: data.description,
          skills: data.skills,
          submitIsLoading: true,
        },
      },
    }))

    const cookiesStore = parseCookies()
    const newProjectFormId = cookiesStore[NEW_PROJECT_COOKIES_ID]

    const newProjectFormIdParsed = JSON.parse(newProjectFormId)

    setCookie(
      null,
      NEW_PROJECT_COOKIES_ID,
      JSON.stringify({ ...newProjectFormIdParsed, description: formId }),
      {
        maxAge: 60 * 30, // 30 minutes
        path: '/me/project/new',
      },
    )

    router.push('/me/project/new/job')
  }

  useEffect(() => {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        description: {
          ...newProjectFormSteps.description,
          isValidToSubmit: isValid,
        },
      },
    }))
  }, [isValid])

  useEffect(() => {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        description: {
          ...newProjectFormSteps.description,
          submitIsLoading: false,
        },
      },
    }))

    if (!newProjectFormSteps.cover.isValidToSubmit) {
      destroyCookie(null, NEW_PROJECT_COOKIES_ID)

      return router.push('/me/project/new/cover')
    }

    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''

      return ''
    }

    window.addEventListener('beforeunload', unloadCallback)
    return () => window.removeEventListener('beforeunload', unloadCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...form}>
      <form
        id="description-form"
        className="space-y-6 odd:pt-6"
        onSubmit={handleSubmit(handleNextStep)}
      >
        <InputTracker>
          <Label htmlFor="description">Descrição do projeto</Label>

          <DescriptionTextArea
            editable={!newProjectFormSteps.description.submitIsLoading}
          />
        </InputTracker>

        <Separator />

        <InputTracker>
          <div className="flex items-center gap-2">
            <Label htmlFor="skills">Habilidades</Label>
            <DoubtBox>
              <span className="text-xs text-muted-foreground">
                O que são as habilidades?
              </span>

              <span className="text-xs leading-normal">
                Aqui você pode adicionar as habilidades gerais que a pessoa deve
                possuir independente da função que ira exercer, desde hard a
                softskills.
              </span>
            </DoubtBox>
          </div>

          <SkillsInput />
        </InputTracker>
      </form>
    </FormProvider>
  )
}
