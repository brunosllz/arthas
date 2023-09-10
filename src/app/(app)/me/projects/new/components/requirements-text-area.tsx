import { TextAreaEditor } from '@/components/text-area-editor'
import { useController, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { InputMessageError } from '@/components/ui/input'

export function RequirementsTextArea() {
  const { control } = useFormContext<CreateNewProjectSchema>()

  const {
    formState: { errors },
    field: { onChange },
  } = useController({
    name: 'requirements',
    control,
  })

  const requirementsErrors = errors.requirements
  const content = requirementsErrors?.content
  let contentMessage = ''

  if (content) {
    if (content[0]?.content) {
      contentMessage = content[0]?.content[0]?.text?.message as string
    }
  }

  return (
    <div className="space-y-1">
      <TextAreaEditor
        id="requirements"
        onChange={onChange}
        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis maxime porro animi provident sapiente voluptatibus a commodi quas eaque vitae ipsam incidunt, nisi eligendi voluptates repudiandae aut tenetur sed. Inventore!"
      />
      {(requirementsErrors || content) && (
        <InputMessageError>
          {contentMessage || requirementsErrors.message}
        </InputMessageError>
      )}
    </div>
  )
}
