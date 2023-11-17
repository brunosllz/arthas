'use client'

import { Seniority } from '@/actions/get-roles-and-seniorities-itens-from-cms'
import { Role } from '@/actions/get-roles-itens-from-cms'
import { UserProfile } from '@/actions/get-user-profile'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputControl,
  InputMessageError,
  InputPrefix,
  InputRoot,
} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/libs/fetch-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const editProfileInput = z.object({
  slugProfile: z
    .string({ required_error: 'Informe a url do seu perfil.' })
    .min(1, { message: 'Informe a url do seu perfil.' }),
  name: z
    .string({ required_error: 'Informe o seu nome completo.' })
    .min(1, { message: 'Informe o seu nome completo.' }),
  title: z
    .string({ required_error: 'Informe o título do seu perfil.' })
    .min(1, { message: 'Informe o título do seu perfil.' }),
  role: z
    .string({ required_error: 'Selecione a sua função.' })
    .min(1, { message: 'Informe a sua função.' }),
  seniority: z
    .string({ required_error: 'Selecione a sua função.' })
    .min(1, { message: 'Informe a sua senioridade.' }),
  city: z
    .string({ required_error: 'Informe a sua cidade.' })
    .min(1, { message: 'Informe a sua cidade.' }),
  state: z
    .string({ required_error: 'Informe o seu estado.' })
    .min(1, { message: 'Informe o seu estado.' }),
  country: z
    .string({ required_error: 'Informe o seu país.' })
    .min(1, { message: 'Informe o seu país.' }),
  linkedinLink: z
    .string()
    .transform((value) => `https://linkedin.com/in/${value}`)
    .optional(),
  githubLink: z
    .string()
    .transform((value) => `https://github.com/${value}`)
    .optional(),
})

export type EditProfileInput = z.infer<typeof editProfileInput>

type EditProfileSectionProps = {
  children: ReactNode
  user: Pick<
    UserProfile,
    | 'state'
    | 'city'
    | 'role'
    | 'country'
    | 'seniority'
    | 'title'
    | 'name'
    | 'linkedinLink'
    | 'githubLink'
    | 'slugProfile'
    | 'updatedAt'
  >
  selectOptions: {
    roles: Role[]
    seniorities: Seniority[]
  }
}

export function EditProfileSection({
  children,
  user,
  selectOptions,
}: EditProfileSectionProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileInput),
    defaultValues: {
      slugProfile: user.slugProfile,
      name: user.name,
      title: user.title,
      role: user.role,
      seniority: user.seniority,
      city: user.city,
      state: user.state,
      country: user.country,
      linkedinLink: user.linkedinLink.split('/').pop(),
      githubLink: user.githubLink.split('/').pop(),
    },
  })

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting: editProfileIsSubmitting },
  } = form

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      city,
      country,
      githubLink,
      linkedinLink,
      name,
      role,
      seniority,
      slugProfile,
      state,
      title,
    }: EditProfileInput) => {
      await api(`/account/user/me/${user.slugProfile}/profile/save`, {
        method: 'POST',
        body: JSON.stringify({
          city,
          country,
          githubLink,
          linkedinLink,
          name,
          role,
          seniority,
          slugProfile,
          state,
          title,
        }),
      })
    },
  })

  async function handleEditProfile(data: EditProfileInput) {
    try {
      const profileSlugWasChanged = user.slugProfile !== data.slugProfile

      await mutateAsync(data)
      setOpen(false)

      if (profileSlugWasChanged) {
        router.replace(`/me/${data.slugProfile}`)
      }

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
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>

        <form
          id="edit-profile"
          className="space-y-6"
          onSubmit={handleSubmit(handleEditProfile)}
        >
          <div className="space-y-3">
            <Label htmlFor="slugProfile">URL do perfil *</Label>

            <InputRoot>
              <InputPrefix>devxperience.app/me/</InputPrefix>
              <InputControl
                id="slugProfile"
                placeholder="john-doe"
                className="pl-2"
                disabled={editProfileIsSubmitting}
                {...register('slugProfile', {
                  onChange: (event) => {
                    const value = event.target.value

                    const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

                    setValue('slugProfile', valueChanged)
                  },
                })}
              />
            </InputRoot>

            {errors.slugProfile && (
              <InputMessageError>
                {errors.slugProfile.message}
              </InputMessageError>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="name">Nome completo *</Label>

            <InputRoot>
              <InputControl
                id="name"
                disabled={editProfileIsSubmitting}
                placeholder="John doe"
                {...register('name')}
              />
            </InputRoot>

            {errors.name && (
              <InputMessageError>{errors.name.message}</InputMessageError>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="title">Titulo do perfil *</Label>

            <InputRoot>
              <InputControl
                id="title"
                disabled={editProfileIsSubmitting}
                placeholder="CEO at Dev Xperience"
                {...register('title')}
              />
            </InputRoot>

            {errors.title && (
              <InputMessageError>{errors.title.message}</InputMessageError>
            )}
          </div>

          <div className="flex items-start gap-4">
            <div className="w-full space-y-3">
              <Label>Função *</Label>

              <Combobox<EditProfileInput>
                name="role"
                items={selectOptions.roles}
                control={control}
                disabled={editProfileIsSubmitting}
                notFoundPlaceholder="Não foi possível encontrar está função."
                placeholder="Selecione uma função"
                searchPlaceholder="Pesquisar função"
              />

              {errors.role && (
                <InputMessageError>{errors.role?.message}</InputMessageError>
              )}
            </div>

            <div className="w-full space-y-3">
              <Label>Senioridade *</Label>

              <Combobox<EditProfileInput>
                name="seniority"
                items={selectOptions.seniorities}
                control={control}
                disabled={editProfileIsSubmitting}
                notFoundPlaceholder="Não foi possível encontrar está senioridade."
                placeholder="Selecione sua senioridade"
                searchPlaceholder="Pesquisar senioridade"
              />

              {errors.seniority && (
                <InputMessageError>
                  {errors.seniority?.message}
                </InputMessageError>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="city">Cidade *</Label>

            <InputRoot>
              <InputControl
                id="city"
                placeholder="Bento Gonçalves"
                disabled={editProfileIsSubmitting}
                {...register('city')}
              />
            </InputRoot>
            {errors.city && (
              <InputMessageError>{errors.city.message}</InputMessageError>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-16 space-y-3">
              <Label htmlFor="state">Estado *</Label>

              <InputRoot>
                <InputControl
                  id="state"
                  maxLength={2}
                  disabled={editProfileIsSubmitting}
                  placeholder="RS"
                  {...register('state')}
                />
              </InputRoot>

              {errors.state && (
                <InputMessageError>{errors.state.message}</InputMessageError>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <Label htmlFor="country">País *</Label>

              <InputRoot>
                <InputControl
                  id="country"
                  placeholder="Brasil"
                  disabled={editProfileIsSubmitting}
                  {...register('country')}
                />
              </InputRoot>

              {errors.country && (
                <InputMessageError>{errors.country.message}</InputMessageError>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="linkedin">Linkedin</Label>

            <InputRoot>
              <InputPrefix>linkedin.com/in/</InputPrefix>
              <InputControl
                id="linkedin"
                placeholder="dev-xperience"
                disabled={editProfileIsSubmitting}
                {...register('linkedinLink', {
                  onChange: (event) => {
                    const value = event.target.value

                    const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

                    setValue('linkedinLink', valueChanged)
                  },
                })}
              />
            </InputRoot>
          </div>

          <div className="space-y-3">
            <Label htmlFor="github">Github</Label>

            <InputRoot>
              <InputPrefix>github.com/</InputPrefix>
              <InputControl
                id="github"
                placeholder="devxperience"
                disabled={editProfileIsSubmitting}
                {...register('githubLink', {
                  onChange: (event) => {
                    const value = event.target.value

                    const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

                    setValue('githubLink', valueChanged)
                  },
                })}
              />
            </InputRoot>
          </div>
        </form>

        <DialogFooter>
          <Button
            disabled={isPending}
            type="submit"
            form="edit-profile"
            className="w-full max-w-[10.8125rem]"
          >
            {isPending || editProfileIsSubmitting ? (
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
