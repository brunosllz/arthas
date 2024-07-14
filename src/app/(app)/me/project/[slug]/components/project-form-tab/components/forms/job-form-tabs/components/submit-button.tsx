/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable no-new */
'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { externalApi } from '@/libs/fetch-api'
import { useBoundStore } from '@/store'
import { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton(props: SubmitButtonProps) {
  const { editProjectFormSteps } = useBoundStore(
    ({ editProjectFormSteps }) => ({
      editProjectFormSteps,
    }),
  )

  async function handleSubmitNewProject() {
    useBoundStore.setState(({ editProjectFormSteps }) => ({
      editProjectFormSteps: {
        ...editProjectFormSteps,
        job: {
          ...editProjectFormSteps.job,
          editProjectJobSubmitIsLoading: true,
        },
      },
    }))

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await externalApi(
      `/projects/${editProjectFormSteps.job.projectId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          roles: editProjectFormSteps.job.roles
            .filter((role) => role.name !== 'default')
            .map((role) => ({
              id: role.roleId,
              name: role.name,
              description: role.description,
              membersAmount: role.membersAmount,
            })),
        }),
      },
    )

    if (!response.ok) {
      console.error(await response.json())

      useBoundStore.setState(({ editProjectFormSteps }) => ({
        editProjectFormSteps: {
          ...editProjectFormSteps,
          job: {
            ...editProjectFormSteps.job,
            editProjectJobSubmitIsLoading: false,
          },
        },
      }))

      return toast({
        title: 'Ocorreu um error ao salvar suas informações do projeto',
        description: (
          <span>
            Você já possui um projeto com este nome{' '}
            <span className="font-semibold">
              {editProjectFormSteps.job.projectName}.
            </span>
          </span>
        ),
        variant: 'destructive',
      })
    }

    useBoundStore.setState(({ editProjectFormSteps }) => ({
      editProjectFormSteps: {
        ...editProjectFormSteps,
        job: {
          ...editProjectFormSteps.job,
          editProjectJobSubmitIsLoading: false,
        },
      },
    }))

    return toast({
      title: 'Informações atualizadas',
      description: `Suas informações do projeto ${editProjectFormSteps.job.projectName} foram atualizadas com sucesso.`,
      variant: 'default',
    })
  }

  return (
    <Button
      disabled={
        !editProjectFormSteps.job.editProjectJobIsValid ||
        editProjectFormSteps.job.editProjectJobSubmitIsLoading
      }
      onClick={handleSubmitNewProject}
      className="w-[11.6875rem]"
      size="lg"
      type="button"
      {...props}
    >
      {editProjectFormSteps.job.editProjectJobSubmitIsLoading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  )
}
