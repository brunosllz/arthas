'use client'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputTracker } from '@/app/(app)/me/components/input-tracker'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DescriptionTextArea } from './components/description-text-area'
import { SkillsInput } from './components/skills-input'
import { DoubtBox } from '@/components/doubt-box'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Loader2 } from 'lucide-react'
import { externalApi } from '@/libs/fetch-api'
import { toast } from '@/components/ui/use-toast'

const descriptionFormInput = z.object({
  projectId: z.string(),
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

type DescriptionFormProps = {
  projectName: string
  projectId: string
  description: string
  skills: Array<string>
  isProjectAuthorOrOwner: boolean
}

export function DescriptionForm(props: DescriptionFormProps) {
  const form = useForm<DescriptionFormInput>({
    resolver: zodResolver(descriptionFormInput),
    defaultValues: {
      projectId: props.projectId,
      description: props.description,
      skills: props.skills ?? [],
    },
  })
  const {
    handleSubmit,
    register,
    formState: {
      isValid: descriptionFormIsValid,
      isSubmitting: descriptionFormIsSubmitting,
    },
  } = form

  async function handleSubmitDescriptionForm(data: DescriptionFormInput) {
    const response = await externalApi(`/projects/${data.projectId}`, {
      method: 'PUT',
      body: JSON.stringify({
        description: data.description,
        generalSkills: data.skills.map((skill) => ({ slug: skill })),
      }),
    })

    if (!response.ok) {
      console.error(await response.json())

      return toast({
        title: 'Ocorreu um error ao salvar suas informações do projeto',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Informações atualizadas',
      description: `Suas informações do projeto ${props.projectName} foram atualizadas com sucesso.`,
      variant: 'default',
    })
  }

  return (
    <div className="flex flex-col items-end gap-9">
      <Card className="w-full">
        <CardContent>
          <FormProvider {...form}>
            <form
              id="description-form"
              className="space-y-6 odd:pt-6"
              onSubmit={handleSubmit(handleSubmitDescriptionForm)}
            >
              <InputTracker>
                <Label htmlFor="description">Descrição do projeto</Label>

                <DescriptionTextArea
                  isProjectAuthorOrOwner={props.isProjectAuthorOrOwner}
                />
              </InputTracker>

              <Separator />

              <InputTracker>
                <div className="flex items-center gap-2">
                  <Label htmlFor="skills">Habilidades</Label>
                  {props.isProjectAuthorOrOwner && (
                    <DoubtBox>
                      <span className="text-xs text-muted-foreground">
                        O que são as habilidades?
                      </span>

                      <span className="text-xs leading-normal">
                        Aqui você pode adicionar as habilidades gerais que a
                        pessoa deve possuir independente da função que ira
                        exercer, desde hard a soft skills.
                      </span>
                    </DoubtBox>
                  )}
                </div>

                <SkillsInput
                  isProjectAuthorOrOwner={props.isProjectAuthorOrOwner}
                />
              </InputTracker>

              <input className="hidden" {...register('projectId')} />
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {props.isProjectAuthorOrOwner && (
        <Button
          disabled={!descriptionFormIsValid || descriptionFormIsSubmitting}
          form="description-form"
          className="ml-auto w-[12.375rem]"
          size="lg"
          type="submit"
        >
          {descriptionFormIsSubmitting ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            'Salvar alterações'
          )}
        </Button>
      )}
    </div>
  )
}
