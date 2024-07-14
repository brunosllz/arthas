'use client'

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MultiSelectInput } from './multi-select-input'
import { Crown, User } from 'lucide-react'
import { SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Role } from '@/actions/get-roles-itens-from-cms'
import { MultiSelectInputPrincipal } from '@/components/multi-select-input-principal'
import { useController, useForm } from 'react-hook-form'

interface SheetFormManageMemberProps {
  memberPermissionType: 'owner' | 'member'
  project: any
  roles: Role[]
}

export function SheetFormManageMember(props: SheetFormManageMemberProps) {
  const { handleSubmit, register, control } = useForm()

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'roles',
  })

  const {
    field: { value: permissionValue, onChange: permissionOnChange },
  } = useController({
    control,
    name: 'permission',
    defaultValue: props.memberPermissionType,
  })

  function handleManageTeamMember(data: any) {
    console.log(data)
  }

  return (
    <>
      <form
        id="manage-member-form"
        className="flex-1 space-y-6"
        onSubmit={handleSubmit(handleManageTeamMember)}
      >
        <div className="space-y-3">
          <span className="text-sm text-zinc-300">Função</span>

          <MultiSelectInputPrincipal
            emptyMessage="Nenhuma função selecionada"
            value={value}
            onSelectedOptions={onChange}
            options={props.project.jobs.map((job: any) => ({
              label: props.roles.find((role) => role.value === job.name)
                ?.label!,
              value: props.roles.find((role) => role.value === job.name)
                ?.value!,
            }))}
            placeholder="Selecione as funções"
            inputType="single"
          />

          {/* <MultiSelectInput
            emptyMessage="Nenhuma função selecionada"
            params={props.project.jobs.map((job) => ({
              label: props.roles.find((role) => role.value === job.name)
                ?.label!,
              value: props.roles.find((role) => role.value === job.name)
                ?.value!,
            }))}
            placeholder="Selecione as funções"
          /> */}
        </div>

        <div className="space-y-3">
          <span className="text-sm text-zinc-300">Alterar hieraquia</span>

          <ToggleGroup
            type="single"
            value={permissionValue}
            className="flex-col gap-3"
            onValueChange={permissionOnChange}
          >
            <ToggleGroupItem
              value="owner"
              variant="outline"
              className="group flex w-full items-start justify-between p-4 data-[state=off]:opacity-50"
            >
              <div className="flex flex-col items-start gap-2.5">
                <Crown size={16} strokeWidth={2.5} />

                <div className="space-y-1">
                  <span className="block text-start text-sm leading-tight">
                    Tonar Dono
                  </span>

                  <span className="block text-start text-sm leading-tight text-muted-foreground">
                    Passar a liderança do projeto para esse membro.
                  </span>
                </div>
              </div>

              <div className="mr-2 h-4 w-4 rounded-full bg-none ring-1 ring-inset ring-input transition-colors group-data-[state=on]:ring-[2px] group-data-[state=on]:ring-zinc-50" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="member"
              variant="outline"
              className="group flex w-full items-start justify-between p-4 data-[state=off]:opacity-50"
            >
              <div className="flex flex-col items-start gap-2.5">
                <User size={16} strokeWidth={2.5} />

                <div className="space-y-1">
                  <span className="block text-start text-sm leading-tight">
                    Tonar Membro
                  </span>

                  <span className="block text-start text-sm leading-tight text-muted-foreground">
                    Tonar este usuário um membro do projeto.
                  </span>
                </div>
              </div>

              <div className="mr-2 h-4 w-4 rounded-full bg-none ring-1 ring-inset ring-input transition-colors group-data-[state=on]:ring-[2px] group-data-[state=on]:ring-zinc-50" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </form>

      <SheetFooter className="sm:space-x-4">
        <Button form="manage-member-form" type="submit">
          Salvar
        </Button>
        <Button variant="outline">Remover da equipe</Button>
      </SheetFooter>
    </>
  )
}
