import { Editor } from '@/components/editor'
import { InputMessageError } from '@/components/ui/input'
import { useController, useFormContext } from 'react-hook-form'

interface RequirementsTextAreaProps {
  editable?: boolean
  content?: string
}

export function AboutMeTextArea({
  editable,
  content,
}: RequirementsTextAreaProps) {
  const { control } = useFormContext()

  const {
    formState: { errors },
    field: { onChange, value },
  } = useController({
    name: 'aboutMe',
    control,
  })

  const MAX_LENGTH = 1200

  return (
    <div className="space-y-1">
      <div className="relative max-w-[704px]">
        <Editor
          id="aboutMe"
          onUpdateMarkdown={(value) => {
            onChange(value)
          }}
          config={{
            editable,
            maxLength: MAX_LENGTH,
            className: '',
          }}
          placeholderValue="Conte-nos sobre você"
          content={content}
        />

        {value && (
          <span
            data-in-limit={value.length > MAX_LENGTH}
            className="absolute bottom-3 right-3 text-xs font-light data-[in-limit=true]:text-red-500"
          >
            {value.length}/{MAX_LENGTH}
          </span>
        )}
      </div>

      {errors.aboutMe && (
        <InputMessageError>
          {errors.aboutMe.message?.toString()}
        </InputMessageError>
      )}
    </div>
  )
}
