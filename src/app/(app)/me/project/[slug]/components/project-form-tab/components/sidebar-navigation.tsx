'use client'

import { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useTrackSelectedStep } from '../../../../contexts/track-selected-step-context'

import { Card, CardContent } from '@/components/ui/card'
import { useBoundStore } from '@/store'

const FORM_STEPS = [
  {
    formHref: 'cover',
    formStep: {
      title: 'Capa do projeto',
    },
    steps: [
      {
        href: 'banner-container',
        name: 'Banner',
      },
      {
        href: 'avatar-container',
        name: 'Avatar',
      },
      {
        href: 'name',
        name: 'Nome do projeto',
      },
      {
        href: 'availability',
        name: 'Disponibilidade',
      },
    ],
  },
  {
    formHref: 'description',
    formStep: {
      title: 'Informações do projeto',
    },
    steps: [
      {
        href: 'description',
        name: 'Descrição do projeto',
      },
      {
        href: 'skills',
        name: 'Habilidades',
      },
    ],
  },
  {
    formHref: 'job',
    formStep: {
      title: 'Informações das vagas',
    },
    steps: [
      {
        href: 'roles',
        name: 'Vagas disponíveis',
      },
      {
        href: 'role-description',
        name: 'Descrição da função',
      },
    ],
  },
]

export function SidebarNavigation() {
  const { currentTarget, handleSetCurrentTarget } = useTrackSelectedStep()

  const { currentFormSelectedFromEditTab } = useBoundStore(
    ({ currentFormSelectedFromEditTab }) => ({
      currentFormSelectedFromEditTab,
    }),
  )

  const currentForm = currentFormSelectedFromEditTab

  function handleFocusElement(
    event: MouseEvent<HTMLAnchorElement>,
    elementHref: string,
  ) {
    event.preventDefault()

    const inputOrDivElement = window.document.getElementById(elementHref)

    if (!inputOrDivElement) {
      return
    }

    if (inputOrDivElement?.tagName.toLowerCase() === 'div') {
      const tiptapEditorContainer =
        inputOrDivElement?.getElementsByClassName('tiptap')

      if (tiptapEditorContainer.length) {
        const divContainer = tiptapEditorContainer?.item(0) as HTMLDivElement

        divContainer.focus()
      }

      const divDropzoneContainer = inputOrDivElement

      divDropzoneContainer.focus()
      return handleSetCurrentTarget(elementHref)
    }

    handleSetCurrentTarget(elementHref)
    const inputElement = inputOrDivElement as HTMLInputElement

    inputElement.focus()
  }

  function handleSelectForm(formHref: string) {
    useBoundStore.setState({
      currentFormSelectedFromEditTab: formHref,
    })
  }

  return (
    <aside className="sticky top-[7.75rem] h-min pb-[5.6875rem]">
      <Card>
        <CardContent className="space-y-6 p-5">
          {FORM_STEPS.map((item, index) => {
            return (
              <div key={item.formHref}>
                <button
                  data-disabled={false}
                  data-is-current-form={currentForm === item.formHref}
                  // data-is-filled={true}
                  type="button"
                  onClick={() => handleSelectForm(item.formHref)}
                  className="flex items-center gap-3 text-muted-foreground  transition-opacity data-[disabled=true]:pointer-events-none data-[disabled=true]:select-none data-[is-current-form=true]:text-primary data-[is-current-form=true]:opacity-100"
                >
                  <span
                    data-is-current-form={currentForm === item.formHref}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-colors data-[is-current-form=true]:border-none data-[is-current-form=true]:bg-zinc-900"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium">{item.formStep.title}</span>
                </button>

                {currentForm === item.formHref && (
                  <div className="ml-4 mt-4 flex flex-col gap-3 border-l-2 px-3 transition-transform">
                    {item.steps.map((step) => (
                      <div key={step.href} className="relative">
                        <a
                          href={`#${step.href}`}
                          onClick={(event) =>
                            handleFocusElement(event, step.href)
                          }
                          className="text-sm text-muted-foreground transition-colors data-[is-selected=true]:text-primary"
                        >
                          {step.name}
                        </a>

                        {currentTarget === step.href && (
                          <motion.div
                            layoutId="activeInput"
                            className="absolute -left-3.5 top-0 h-6 w-0.5  bg-primary"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </aside>
  )
}
