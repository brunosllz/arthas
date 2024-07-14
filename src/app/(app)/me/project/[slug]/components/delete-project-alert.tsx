'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { externalApi } from '@/libs/fetch-api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type DeleteProjectAlertProps = {
  projectId: string
  projectName: string
}

export function DeleteProjectAlert({
  projectName,
  projectId,
}: DeleteProjectAlertProps) {
  const router = useRouter()

  const { mutateAsync: deleteProject, isPending } = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) =>
      await externalApi(`/projects/${projectId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      router.push('/me/projects')
    },
  })

  async function handleDeleteProject() {
    await deleteProject({ projectId })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Tem certeza que deseja excluir o projeto?
        </AlertDialogTitle>

        <AlertDialogDescription>
          Está ação é irreversível. O seu projeto{' '}
          <span className="font-semibold text-primary">{projectName}</span> será
          excluído permanentemente.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteProject}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}
