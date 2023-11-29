'use client'

import { useBoundStore } from '@/store'
import { useEffect } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobForm } from './job-form'
import { Button } from '@/components/ui/button'

import { X } from 'lucide-react'
import { destroyCookie } from 'nookies'
import { NEW_PROJECT_COOKIES_ID } from '../../layout'
import { useRouter } from 'next/navigation'

export function JobTabs() {
  const router = useRouter()
  const { newProjectFormSteps, deleteRoleFromJob } = useBoundStore(
    ({ newProjectFormSteps, deleteRoleFromJob }) => ({
      newProjectFormSteps,
      deleteRoleFromJob,
    }),
  )

  let hasSomeJobCreated = false

  if (newProjectFormSteps.job.roles) {
    hasSomeJobCreated = newProjectFormSteps.job.roles.length > 1
  }

  useEffect(() => {
    useBoundStore.setState((state) => ({
      newProjectFormSteps: {
        ...state.newProjectFormSteps,
        job: {
          ...state.newProjectFormSteps.job,
          isValidToSubmit: hasSomeJobCreated,
        },
      },
    }))
  }, [hasSomeJobCreated])

  useEffect(() => {
    useBoundStore.setState(({ newProjectFormSteps }) => ({
      newProjectFormSteps: {
        ...newProjectFormSteps,
        description: {
          ...newProjectFormSteps.description,
          submitIsLoading: false,
        },
        job: {
          ...newProjectFormSteps.job,
          submitIsLoading: false,
        },
      },
    }))

    if (
      !newProjectFormSteps.cover.isValidToSubmit &&
      !newProjectFormSteps.description.isValidToSubmit
    ) {
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
    <Tabs
      onValueChange={(value) =>
        useBoundStore.setState((state) => ({
          newProjectFormSteps: {
            ...state.newProjectFormSteps,
            job: {
              ...state.newProjectFormSteps.job,
              currentProjectJobTab: value,
            },
          },
        }))
      }
      value={newProjectFormSteps.job.currentProjectJobTab}
    >
      {hasSomeJobCreated && (
        <div className="space-y-3.5">
          <span className="text-sm">Vagas cadastradas</span>

          <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent p-0 pb-6">
            {newProjectFormSteps.job.roles &&
              newProjectFormSteps.job.roles.map((role) => (
                <>
                  {role.name !== 'default' && (
                    <TabsTrigger
                      key={role.name}
                      disabled={newProjectFormSteps.job.submitIsLoading}
                      value={role.name}
                      className="group flex items-center gap-2 border px-6 py-3 data-[state=active]:bg-primary hover:bg-accent data-[state=active]:hover:bg-primary disabled:pointer-events-none disabled:opacity-50"
                    >
                      <span className="text-xs font-semibold text-primary group-hover:text-accent-foreground group-data-[state=active]:text-primary-foreground group-data-[state=active]:hover:text-primary-foreground">
                        {role.membersAmount} -{' '}
                        {
                          newProjectFormSteps.job.roleItens.find(
                            (item) => item.value === role.name,
                          )?.label
                        }
                      </span>

                      <button
                        type="button"
                        className="text-primary group-hover:text-accent-foreground group-data-[state=active]:text-primary-foreground group-data-[state=active]:hover:text-primary-foreground"
                        onClick={() => deleteRoleFromJob(role.roleId)}
                      >
                        <X size={14} />
                      </button>
                    </TabsTrigger>
                  )}
                </>
              ))}
          </TabsList>
        </div>
      )}

      {newProjectFormSteps.job.roles &&
        newProjectFormSteps.job.roles.map((role, index) => {
          const isDefaultRole = role.name === 'default'

          return (
            <TabsContent
              className="m-0"
              key={`${role.name}-${index}`}
              value={role.name}
            >
              <JobForm
                defaultValues={{
                  roleId: isDefaultRole ? undefined : role.roleId,
                  membersAmount: isDefaultRole ? undefined : role.membersAmount,
                  description: isDefaultRole ? undefined : role.description,
                  name: isDefaultRole ? undefined : role.name,
                }}
              >
                {isDefaultRole ? (
                  <Button
                    size="sm"
                    disabled={
                      !newProjectFormSteps.job.newProjectJobIsValid ||
                      newProjectFormSteps.job.submitIsLoading
                    }
                  >
                    Adicionar vaga
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      disabled={newProjectFormSteps.job.submitIsLoading}
                      onClick={() =>
                        useBoundStore.setState((state) => ({
                          newProjectFormSteps: {
                            ...state.newProjectFormSteps,
                            job: {
                              ...state.newProjectFormSteps.job,
                              currentProjectJobTab: 'default',
                            },
                          },
                        }))
                      }
                    >
                      Adicionar outra vaga
                    </Button>
                    <Button
                      size="sm"
                      disabled={newProjectFormSteps.job.submitIsLoading}
                    >
                      Salvar
                    </Button>
                  </>
                )}
              </JobForm>
            </TabsContent>
          )
        })}
    </Tabs>
  )
}
