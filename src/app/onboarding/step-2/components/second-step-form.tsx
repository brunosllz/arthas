'use client'

import { ChangeEvent, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import { InputControl, InputPrefix, InputRoot } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Combobox } from '@/components/ui/combobox'

const secondStepInput = z.object({
  role: z.string().min(1),
  seniority: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  githubLink: z.string().optional(),
  linkedinLink: z.string().optional(),
})

export type SecondStepInput = z.infer<typeof secondStepInput>

export function SecondStepForm() {
  const { addUserInfos, user, animatedBrowser } = useBoundStore()
  const router = useRouter()

  const form = useForm<SecondStepInput>({
    resolver: zodResolver(secondStepInput),
    defaultValues: {
      role: user.role,
      seniority: user.seniority,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

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
        <div className="flex items-end gap-4">
          <div className="w-full space-y-3">
            <Label>Função *</Label>

            <Combobox<SecondStepInput>
              name="role"
              items={[
                {
                  value: 'next.js',
                  label: 'Next.js',
                },
                {
                  value: 'sveltekit',
                  label: 'SvelteKit',
                },
                {
                  value: 'nuxt.js',
                  label: 'Nuxt.js',
                },
                {
                  value: 'remix',
                  label: 'Remix',
                },
                {
                  value: 'astro',
                  label: 'Astro',
                },
              ]}
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
          </div>

          <div className="w-full space-y-3">
            <Label>Senioridade *</Label>

            <Combobox<SecondStepInput>
              name="seniority"
              items={[
                {
                  value: 'next.js',
                  label: 'Next.js',
                },
                {
                  value: 'sveltekit',
                  label: 'SvelteKit',
                },
                {
                  value: 'nuxt.js',
                  label: 'Nuxt.js',
                },
                {
                  value: 'remix',
                  label: 'Remix',
                },
                {
                  value: 'astro',
                  label: 'Astro',
                },
              ]}
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
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="city">Cidade *</Label>

          <InputRoot>
            <InputControl
              id="city"
              defaultValue={user.city}
              placeholder="Bento Gonçalves"
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
        </div>
        <div className="flex gap-4">
          <div className="w-16 space-y-3">
            <Label htmlFor="state">Estado *</Label>

            <InputRoot>
              <InputControl
                id="state"
                defaultValue={user.state}
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
          </div>

          <div className="flex-1 space-y-3">
            <Label htmlFor="country">País *</Label>

            <InputRoot>
              <InputControl
                id="country"
                defaultValue={user.country}
                placeholder="Brasil"
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
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="linkedin">Linkedin</Label>

          <InputRoot>
            <InputPrefix>linkedin.com/in/</InputPrefix>
            <InputControl
              id="linkedin"
              defaultValue={user.linkedinLink}
              placeholder="dev-xperience"
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
              defaultValue={user.githubLink?.split('/').pop()}
              placeholder="devxperience"
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
          Avançar
        </Button>
      </form>
    </FormProvider>
  )
}
