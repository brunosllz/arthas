import { Input, InputMessageError } from '@/components/ui/input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { Button } from '@/components/ui/button'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Plus, X } from 'lucide-react'

export function RolesInput() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateNewProjectSchema>()
  const [parent] = useAutoAnimate()

  const { fields, append, remove } = useFieldArray({
    name: 'roles',
    control,
  })

  function handleAddRole() {
    append({ name: '', amount: null })
  }

  function handleRemoveRole(index: number) {
    remove(index)
  }

  return (
    <div className="flex flex-col">
      <Button
        variant="secondary"
        size="sm"
        type="button"
        className="ml-auto"
        onClick={handleAddRole}
      >
        <Plus size={12} className="mr-2" /> Add role
      </Button>

      <div ref={parent} className="mt-4 space-y-4">
        {fields.map((field, index) => {
          const deleteAvailable = fields.length > 1

          return (
            <div className="space-y-1" key={field.id}>
              <div
                data-deleted={deleteAvailable}
                className="col-start-2 grid grid-cols-[minmax(1rem,4rem)_1fr] gap-4 data-[deleted=true]:grid-cols-[minmax(1rem,4rem)_1fr_minmax(2rem,2.25rem)]"
              >
                <div className="flex items-center space-x-1">
                  <Input
                    id="roles"
                    type="number"
                    placeholder="0"
                    {...register(`roles.${index}.amount`)}
                  />
                  <span className="text-sm text-muted-foreground">x</span>
                </div>

                <Input
                  id="roles"
                  placeholder="Front-end"
                  {...register(`roles.${index}.name`)}
                />

                {deleteAvailable && (
                  <Button
                    size="icon"
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveRole(index)}
                  >
                    <X size={14} strokeWidth={2.5} />
                  </Button>
                )}
              </div>

              {errors.roles?.[index]?.amount?.type === 'custom' ? (
                <InputMessageError>
                  {errors.roles?.[index]?.amount?.message}
                </InputMessageError>
              ) : (
                <InputMessageError>
                  {errors.roles?.[index]?.name?.message ||
                    errors.roles?.[index]?.amount?.message}
                </InputMessageError>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// {errors.roles?.[index]?.name && errors.roles?.[index]?.amount ? (
//   <InputMessageError>
//     {`${errors.roles?.[index]?.amount
//       ?.message} and ${errors.roles?.[
//       index
//     ]?.name?.message?.toLowerCase()}`}
//   </InputMessageError>
// ) : (
//   <InputMessageError>
//     {errors.roles?.[index]?.name?.message ||
//       errors.roles?.[index]?.amount?.message}
//   </InputMessageError>
// )}
