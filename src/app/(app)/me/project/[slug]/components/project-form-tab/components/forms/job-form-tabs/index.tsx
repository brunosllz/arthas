'use client'

import { useBoundStore } from '@/store'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobForm } from './components/job-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { Loader2, X } from 'lucide-react'
import { SubmitButton } from './components/submit-button'

type JobFormTabsProps = {
  isProjectAuthorOrOwner: boolean
}

export function JobFormTabs(props: JobFormTabsProps) {
  const { editProjectFormSteps, deleteEditProjectRoleFromJob } = useBoundStore(
    ({ editProjectFormSteps, deleteEditProjectRoleFromJob }) => ({
      editProjectFormSteps,
      deleteEditProjectRoleFromJob,
    }),
  )

  let hasSomeJobCreated = false

  if (editProjectFormSteps.job.roles) {
    hasSomeJobCreated = editProjectFormSteps.job.roles.length > 1
  }

  return (
    <div className="flex flex-col items-end gap-9">
      <Card className="w-full pt-5">
        <CardContent>
          <Tabs
            onValueChange={(value) =>
              useBoundStore.setState((state) => ({
                editProjectFormSteps: {
                  ...state.editProjectFormSteps,
                  job: {
                    ...state.editProjectFormSteps.job,
                    currentProjectJobTab: value,
                  },
                },
              }))
            }
            value={editProjectFormSteps.job.currentProjectJobTab}
          >
            {hasSomeJobCreated && (
              <div className="space-y-3.5">
                <span className="text-sm">Vagas cadastradas</span>

                <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent p-0 pb-6">
                  {editProjectFormSteps.job.roles &&
                    editProjectFormSteps.job.roles.map((role) => (
                      <>
                        {role.name !== 'default' && (
                          <TabsTrigger
                            key={role.name}
                            disabled={
                              editProjectFormSteps.job
                                .editProjectJobSubmitIsLoading
                            }
                            value={role.name}
                            className="group flex items-center gap-2 border px-6 py-3 data-[state=active]:bg-primary hover:bg-accent data-[state=active]:hover:bg-primary disabled:pointer-events-none disabled:opacity-50"
                          >
                            <span className="text-xs font-semibold text-primary group-hover:text-accent-foreground group-data-[state=active]:text-primary-foreground group-data-[state=active]:hover:text-primary-foreground">
                              {String(role.membersAmount).padStart(2, '0')} -{' '}
                              {
                                editProjectFormSteps.job.roleItens.find(
                                  (item) => item.value === role.name,
                                )?.label
                              }
                            </span>

                            {props.isProjectAuthorOrOwner && (
                              <button
                                type="button"
                                disabled={!props.isProjectAuthorOrOwner}
                                className="text-primary group-hover:text-accent-foreground group-data-[state=active]:text-primary-foreground group-data-[state=active]:hover:text-primary-foreground"
                                onClick={() =>
                                  deleteEditProjectRoleFromJob(role.roleId)
                                }
                              >
                                <X size={14} />
                              </button>
                            )}
                          </TabsTrigger>
                        )}
                      </>
                    ))}
                </TabsList>
              </div>
            )}

            {editProjectFormSteps.job.roles &&
              editProjectFormSteps.job.roles.map((role, index) => {
                const isDefaultRole = role.name === 'default'

                return (
                  <TabsContent
                    className="m-0"
                    key={`${role.name}-${index}`}
                    value={role.name}
                  >
                    <JobForm
                      isProjectAuthorOrOwner={props.isProjectAuthorOrOwner}
                      defaultValues={{
                        roleId: isDefaultRole ? undefined : role.roleId,
                        membersAmount: isDefaultRole
                          ? undefined
                          : role.membersAmount,
                        description: isDefaultRole
                          ? undefined
                          : role.description,
                        name: isDefaultRole ? undefined : role.name,
                      }}
                    >
                      {props.isProjectAuthorOrOwner &&
                        (isDefaultRole ? (
                          <Button
                            size="sm"
                            disabled={
                              !editProjectFormSteps.job.editProjectJobIsValid ||
                              editProjectFormSteps.job
                                .editProjectJobSubmitIsLoading
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
                              disabled={
                                editProjectFormSteps.job
                                  .editProjectJobSubmitIsLoading
                              }
                              onClick={() =>
                                useBoundStore.setState((state) => ({
                                  editProjectFormSteps: {
                                    ...state.editProjectFormSteps,
                                    job: {
                                      ...state.editProjectFormSteps.job,
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
                              disabled={
                                editProjectFormSteps.job
                                  .editProjectJobSubmitIsLoading
                              }
                            >
                              Salvar
                            </Button>
                          </>
                        ))}
                    </JobForm>
                  </TabsContent>
                )
              })}
          </Tabs>
        </CardContent>
      </Card>

      {props.isProjectAuthorOrOwner && (
        <SubmitButton
          disabled={editProjectFormSteps.job.editProjectJobSubmitIsLoading}
          className="ml-auto w-[12.375rem]"
          type="submit"
        >
          {editProjectFormSteps.job.editProjectJobSubmitIsLoading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            'Salvar alterações'
          )}
        </SubmitButton>
      )}
    </div>
  )
}
