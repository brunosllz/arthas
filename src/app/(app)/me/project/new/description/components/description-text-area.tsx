import { Editor } from '@/components/editor'
import { InputMessageError } from '@/components/ui/input'
import { useController, useFormContext } from 'react-hook-form'
import { DescriptionFormInput } from './description-form'
import { useTrackSelectedStep } from '../../contexts/track-selected-step-context'

interface RequirementsTextAreaProps {
  editable?: boolean
}

export function DescriptionTextArea({ editable }: RequirementsTextAreaProps) {
  const { control } = useFormContext<DescriptionFormInput>()
  const { handleSetCurrentTarget } = useTrackSelectedStep()

  const {
    formState: { errors },
    field: { onChange, value },
  } = useController({
    name: 'description',
    control,
  })

  const MAX_LENGTH = 1200

  return (
    <div className="space-y-1">
      <div className="relative">
        <Editor
          id="description"
          onUpdateMarkdown={(value) => {
            onChange(value)
          }}
          config={{
            editable,
            maxLength: MAX_LENGTH,
            className: '',
          }}
          onFocusMarkdown={() => {
            handleSetCurrentTarget('description')
          }}
          placeholderValue="Conte-nos sobre você"
          content={value}
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

      {errors.description && (
        <InputMessageError>
          {errors.description.message?.toString()}
        </InputMessageError>
      )}
    </div>
  )
}
