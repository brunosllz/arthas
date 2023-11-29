'use client'

import { ReactNode, useEffect, useId } from 'react'
import { z } from 'zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBoundStore } from '@/store'

import {
  InputControl,
  InputMessageError,
  InputRoot,
} from '@/components/ui/input'
import { InputTracker } from '../../components/input-tracker'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DescriptionRoleTextArea } from './description-role-text-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { objectsHaveEqualProperty } from '@/utils/objects-have-equal-property'
import { toast } from '@/components/ui/use-toast'
import { DoubtBox } from '@/components/doubt-box'

const jobFormInput = z.object({
  roleId: z.string(),
  name: z
    .string({ required_error: 'Você deve selecionar uma função.' })
    .min(1, { message: 'Você selecionar pelo menos uma função.' }),
  membersAmount: z
    .number({
      required_error: 'Você deve inserir a quantidade de vagas.',
      invalid_type_error: 'Você deve inserir um número.',
    })
    .min(1, { message: 'Você deve inserir pelo menos uma vaga.' })
    .max(10, { message: 'Você pode disponibilizar até 10 vagas por função.' }),
  description: z
    .string({
      required_error: 'Você deve inserir uma descrição para a função.',
    })
    .max(1200, { message: 'Limite máximo de 1200 caracteres.' })
    .min(10, { message: 'Limite mínimo de 10 caracteres.' }),
})

export type JobFormInput = z.infer<typeof jobFormInput>

type JobFormProps = {
  children: ReactNode
  defaultValues: {
    roleId?: string
    name?: string
    membersAmount?: number
    description?: string
  }
}

export function JobForm({ defaultValues, children }: JobFormProps) {
  const { newProjectFormSteps } = useBoundStore(({ newProjectFormSteps }) => ({
    newProjectFormSteps,
  }))

  const roleId = useId()

  const form = useForm<JobFormInput>({
    resolver: zodResolver(jobFormInput),
    defaultValues: {
      ...defaultValues,
      roleId: defaultValues.roleId ?? roleId,
    },
  })

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isValid, errors },
  } = form

  function handleNextStep(data: JobFormInput) {
    const projectJobs = useBoundStore.getState().newProjectFormSteps.job.roles
    const { description, roleId, membersAmount, name: roleName } = data

    if (projectJobs) {
      const jobIsRegistered = projectJobs.find((job) => job.roleId === roleId)

      if (jobIsRegistered) {
        const jobRegisteredHasNotChanged = objectsHaveEqualProperty(
          data,
          jobIsRegistered,
        )

        if (jobRegisteredHasNotChanged) {
          return
        }

        const jobChangedIndex = projectJobs.findIndex(
          (job) => job.roleId === data.roleId,
        )

        projectJobs.splice(jobChangedIndex, 1, {
          roleId: data.roleId,
          description: data.description,
          membersAmount: data.membersAmount,
          name: data.name,
        })

        useBoundStore.setState((state) => ({
          newProjectFormSteps: {
            ...state.newProjectFormSteps,
            job: {
              ...state.newProjectFormSteps.job,
              roles: projectJobs,
              currentProjectJobTab: data.name,
            },
          },
        }))

        return toast({
          title: 'Vaga Atualizada',
          description: (
            <span>
              A vaga{' '}
              <span className="font-semibold">
                {
                  newProjectFormSteps.job.roleItens.find(
                    (role) => role.value === data.name,
                  )?.label
                }
              </span>{' '}
              foi atualizada com sucesso.
            </span>
          ),
          variant: 'default',
        })
      }
    }

    useBoundStore.setState((state) => ({
      newProjectFormSteps: {
        ...state.newProjectFormSteps,
        job: {
          ...state.newProjectFormSteps.job,
          roles: state.newProjectFormSteps.job.roles && [
            ...state.newProjectFormSteps.job.roles,
            {
              roleId,
              description,
              membersAmount,
              name: roleName,
            },
          ],
          currentProjectJobTab: roleName,
        },
      },
    }))

    reset()
  }

  const roleItems = newProjectFormSteps.job.roleItens.filter((role) => {
    const currentProjectJobTabIsSelected =
      newProjectFormSteps.job.currentProjectJobTab

    if (currentProjectJobTabIsSelected === role.value) {
      return true
    }

    if (newProjectFormSteps.job.roles) {
      const roleisSelected = newProjectFormSteps.job.roles.find(
        (selectedRole) => selectedRole.name === role.value,
      )

      return !roleisSelected
    }

    return true
  })

  useEffect(() => {
    useBoundStore.setState((state) => ({
      newProjectFormSteps: {
        ...state.newProjectFormSteps,
        job: {
          ...state.newProjectFormSteps.job,
          newProjectJobIsValid: isValid,
        },
      },
    }))
  }, [isValid])

  return (
    <FormProvider {...form}>
      <form
        id="job-form"
        className="space-y-6"
        onSubmit={handleSubmit(handleNextStep)}
      >
        <InputTracker>
          <div className="flex items-center gap-2">
            <Label htmlFor="roles">Vagas disponíveis</Label>

            <DoubtBox>
              <span className="text-xs leading-normal">
                Você pode disponibilizar até 10 vagas por função.
              </span>
            </DoubtBox>
          </div>

          <div className="flex items-start gap-[1.125rem]">
            <div className="w-full">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value, ref } }) => {
                  return (
                    <Select
                      onValueChange={onChange}
                      value={value}
                      defaultValue={value}
                    >
                      <SelectTrigger
                        ref={ref}
                        id="roles"
                        disabled={newProjectFormSteps.job.submitIsLoading}
                      >
                        <SelectValue
                          placeholder="Função"
                          className="placeholder:text-muted-foreground"
                        />
                      </SelectTrigger>

                      <SelectContent className="max-h-56 w-full overflow-y-auto">
                        {roleItems.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }}
              />

              {errors.name && (
                <InputMessageError>{errors.name.message}</InputMessageError>
              )}
            </div>

            <div className="w-full">
              <InputRoot>
                <InputControl
                  id="roles"
                  type="number"
                  disabled={newProjectFormSteps.job.submitIsLoading}
                  placeholder="2 vagas"
                  {...register('membersAmount', { valueAsNumber: true })}
                />
              </InputRoot>

              {errors.membersAmount && (
                <InputMessageError>
                  {errors.membersAmount.message}
                </InputMessageError>
              )}
            </div>
          </div>
        </InputTracker>

        <Separator />

        <InputTracker>
          <Label htmlFor="role-description">Descrição da função</Label>

          <DescriptionRoleTextArea />
        </InputTracker>

        <input className="hidden" {...register('roleId')} />

        <div className="flex w-full justify-end gap-3">{children}</div>
      </form>
    </FormProvider>
  )
}
