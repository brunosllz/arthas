import { TextAreaEditor } from '@/components/text-area-editor'
import { useController, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { InputMessageError } from '@/components/ui/input'

interface DescriptionTextAreaProps {
  disabled?: boolean
}

export function DescriptionTextArea({ disabled }: DescriptionTextAreaProps) {
  const { control } = useFormContext<CreateNewProjectSchema>()

  const {
    formState: { errors },
    field: { onChange },
  } = useController({
    name: 'description',
    control,
  })

  return (
    <div className="space-y-1">
      <TextAreaEditor
        id="description"
        onChange={onChange}
        disabled={disabled}
        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis maxime porro animi provident sapiente voluptatibus a commodi quas eaque vitae ipsam incidunt, nisi eligendi voluptates repudiandae aut tenetur sed. Inventore!"
      />
      {errors.description && (
        <InputMessageError>{errors.description.message}</InputMessageError>
      )}
    </div>
  )
}
