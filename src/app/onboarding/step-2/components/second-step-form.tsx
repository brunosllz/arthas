'use client'

import { ChangeEvent, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useBoundStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role, Seniority } from '@/actions/get-onboarding-itens-from-cms'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  InputControl,
  InputMessageError,
  InputPrefix,
  InputRoot,
} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox } from '@/components/ui/combobox'

import { Loader2 } from 'lucide-react'

const secondStepInput = z.object({
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
  githubLink: z.string().optional(),
  linkedinLink: z.string().optional(),
})

export type SecondStepInput = z.infer<typeof secondStepInput>

type SecondStepFormProps = {
  rolesItens: Role[]
  senioritiesItens: Seniority[]
}

export function SecondStepForm({
  rolesItens,
  senioritiesItens,
}: SecondStepFormProps) {
  const { setUser, user, animatedBrowser } = useBoundStore()
  const router = useRouter()

  const form = useForm<SecondStepInput>({
    resolver: zodResolver(secondStepInput),
    defaultValues: {
      role: user.role,
      seniority: user.seniority,
      city: user.city,
      state: user.state,
      country: user.country,
      githubLink: user.githubLink?.split('/').pop(),
      linkedinLink: user.linkedinLink?.split('/').pop(),
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting: nextStepFormIsSubmitting },
  } = form

  function nextStepSubmit() {
    router.push('/onboarding/step-3')
  }

  function onChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    if (name === 'linkedinLink') {
      const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

      setValue('linkedinLink', valueChanged)

      return setUser({
        [name]: `https://linkedin.com/in/${valueChanged}`,
      })
    }

    if (name === 'githubLink') {
      const valueChanged = value.replace(/[^a-zA-Z0-9-]+/g, '-')

      setValue('githubLink', valueChanged)

      return setUser({
        [name]: `https://github.com/${value}`,
      })
    }

    setUser({
      [name]: value,
    })
  }

  function onChangeComboboxValue(name: string, value: string) {
    setUser({
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
    <FormProvider {...form}>
      <form
        className="mt-[2.625rem] space-y-6"
        onSubmit={handleSubmit(nextStepSubmit)}
      >
        <div className="flex items-start gap-4">
          <div className="w-full space-y-3">
            <Label>Função *</Label>

            <Combobox<SecondStepInput>
              name="role"
              items={rolesItens}
              notFoundPlaceholder="Não foi possível encontrar está função."
              placeholder="Selecione uma função"
              searchPlaceholder="Pesquisar função"
              onChangeValue={onChangeComboboxValue}
              onFocus={() => {
                if (animatedBrowser.x === 0) {
                  return
                }

                useBoundStore.setState({
                  animatedBrowser: {
                    x: 0,
                    y: 0,
                    scale: 1,
                  },
                })
              }}
            />

            {errors.role && (
              <InputMessageError>{errors.role?.message}</InputMessageError>
            )}
          </div>

          <div className="w-full space-y-3">
            <Label>Senioridade *</Label>

            <Combobox<SecondStepInput>
              name="seniority"
              items={senioritiesItens}
              notFoundPlaceholder="Não foi possível encontrar está senioridade."
              placeholder="Selecione sua senioridade"
              searchPlaceholder="Pesquisar senioridade"
              onChangeValue={onChangeComboboxValue}
              onFocus={() => {
                if (animatedBrowser.x === 0) {
                  return
                }

                useBoundStore.setState({
                  animatedBrowser: {
                    x: 0,
                    y: 0,
                    scale: 1,
                  },
                })
              }}
            />

            {errors.seniority && (
              <InputMessageError>{errors.seniority?.message}</InputMessageError>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="city">Cidade *</Label>

          <InputRoot>
            <InputControl
              id="city"
              placeholder="Bento Gonçalves"
              disabled={nextStepFormIsSubmitting}
              onFocus={() => {
                if (animatedBrowser.x === 0) {
                  return
                }

                useBoundStore.setState({
                  animatedBrowser: {
                    x: 0,
                    y: 0,
                    scale: 1,
                  },
                })
              }}
              {...register('city', {
                required: true,
                onChange: (event) => onChangeInputValue(event),
              })}
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
                disabled={nextStepFormIsSubmitting}
                placeholder="RS"
                onFocus={() => {
                  if (animatedBrowser.x === 0) {
                    return
                  }

                  useBoundStore.setState({
                    animatedBrowser: {
                      x: 0,
                      y: 0,
                      scale: 1,
                    },
                  })
                }}
                {...register('state', {
                  required: true,
                  onChange: (event) => onChangeInputValue(event),
                })}
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
                disabled={nextStepFormIsSubmitting}
                onFocus={() => {
                  if (animatedBrowser.x === 0) {
                    return
                  }

                  useBoundStore.setState({
                    animatedBrowser: {
                      x: 0,
                      y: 0,
                      scale: 1,
                    },
                  })
                }}
                {...register('country', {
                  required: true,
                  onChange: (event) => onChangeInputValue(event),
                })}
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
              disabled={nextStepFormIsSubmitting}
              onFocus={() => {
                if (animatedBrowser.x === -480) {
                  return
                }

                useBoundStore.setState({
                  animatedBrowser: {
                    x: -480,
                    y: 0,
                    scale: 1,
                  },
                })
              }}
              {...register('linkedinLink', {
                required: true,
                onChange: (event) => onChangeInputValue(event),
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
              disabled={nextStepFormIsSubmitting}
              onFocus={() => {
                if (animatedBrowser.x === -480) {
                  return
                }

                useBoundStore.setState({
                  animatedBrowser: {
                    x: -480,
                    y: 0,
                    scale: 1,
                  },
                })
              }}
              {...register('githubLink', {
                required: true,
                onChange: (event) => onChangeInputValue(event),
              })}
            />
          </InputRoot>
        </div>

        <Button size="xl" className="w-full font-semibold">
          {nextStepFormIsSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            'Avançar'
          )}
        </Button>
      </form>
    </FormProvider>
  )
}
