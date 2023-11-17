'use client'

import { Button } from '@/components/ui/button'
// import { Combobox } from '@/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog'
// import {
//   InputControl,
//   InputMessageError,
//   InputPrefix,
//   InputRoot,
// } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ReactNode, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AboutMeTextArea } from './about-me-text-area'
import { UserProfile } from '@/actions/get-user-profile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SkillsInput } from './skills-input'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/libs/fetch-api'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import dayjs from 'dayjs'

const editAboutInput = z.object({
  aboutMe: z
    .string()
    .max(1200, { message: 'Limite máximo de 1200 caracteres.' })
    .optional(),
  skills: z.array(z.string(), { required_error: 'Select a technology' }),
})

export type EditAboutInput = z.infer<typeof editAboutInput>

type EditaPersonalSectionProps = {
  children: ReactNode
  user: Pick<UserProfile, 'aboutMe' | 'skills' | 'slugProfile' | 'updatedAt'>
}

export function EditAboutSection({
  children,
  user,
}: EditaPersonalSectionProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<EditAboutInput>({
    resolver: zodResolver(editAboutInput),
    defaultValues: {
      aboutMe: user.aboutMe ?? '',
      skills: user.skills ?? [],
    },
  })

  const {
    handleSubmit,

    formState: { isSubmitting },
  } = form

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ skills, aboutMe }: EditAboutInput) => {
      await api(`/account/user/me/${user.slugProfile}/about/save`, {
        method: 'POST',
        body: JSON.stringify({
          skills,
          aboutMe,
        }),
      })
    },
  })

  async function handleEditAbout(data: EditAboutInput) {
    try {
      await mutateAsync(data)
      setOpen(false)

      router.refresh()
    } catch (error) {
      console.error(error)

      return toast({
        title: 'Ocorreu um error ao salvar suas informações.',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogTitle>Editar perfil</DialogTitle>

        <FormProvider {...form}>
          <form
            id="edit-about"
            className="space-y-6"
            onSubmit={handleSubmit(handleEditAbout)}
          >
            <div className="space-y-3.5">
              <Label htmlFor="aboutMe">Sobre</Label>

              <AboutMeTextArea
                content={user.aboutMe ?? ''}
                editable={!isSubmitting || !isPending}
              />
            </div>

            <div className="space-y-3.5">
              <Label htmlFor="technologies">Habilidades</Label>

              <SkillsInput disabled={isSubmitting || isPending} />
            </div>
          </form>
        </FormProvider>

        <DialogFooter>
          <Button
            form="edit-about"
            type="submit"
            className="w-full max-w-[10.8125rem]"
          >
            {isPending || isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              'Salvar alterações'
            )}
          </Button>
          <span className="block text-xs text-muted-foreground">
            Última alteração realizada em{' '}
            {dayjs(user.updatedAt).format('DD/MM/YYYY')}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
