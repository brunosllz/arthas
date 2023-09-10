import { TextAreaEditor } from '@/components/text-area-editor'
import { useController, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { InputMessageError } from '@/components/ui/input'

export function DescriptionTextArea() {
  const { control } = useFormContext<CreateNewProjectSchema>()

  const {
    formState: { errors },
    field: { onChange },
  } = useController({
    name: 'description',
    control,
  })

  console.log()

  // const message = errors!.description!.content

  // if (message) {
  //   const t = message[0]!.content[0]?.message
  // }

  const descriptionErrors = errors.description
  const content = descriptionErrors?.content
  let contentMessage = ''

  if (content) {
    if (content[0]?.content) {
      contentMessage = content[0]?.content[0]?.text?.message as string
    }
  }

  return (
    <div className="space-y-1">
      <TextAreaEditor
        id="description"
        onChange={onChange}
        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis maxime porro animi provident sapiente voluptatibus a commodi quas eaque vitae ipsam incidunt, nisi eligendi voluptates repudiandae aut tenetur sed. Inventore!"
      />
      {(descriptionErrors || content) && (
        <InputMessageError>
          {contentMessage || descriptionErrors.message}
        </InputMessageError>
      )}
    </div>
  )
}
