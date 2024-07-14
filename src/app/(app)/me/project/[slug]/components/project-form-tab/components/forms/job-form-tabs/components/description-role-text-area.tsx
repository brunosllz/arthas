import { Editor } from '@/components/editor'
import { InputMessageError } from '@/components/ui/input'
import { useController, useFormContext } from 'react-hook-form'
import { JobFormInput } from './job-form'
import { useTrackSelectedStep } from '@/app/(app)/me/project/contexts/track-selected-step-context'
import { useBoundStore } from '@/store'

type DescriptionRoleTextAreaProps = {
  isProjectAuthorOrOwner: boolean
}

export function DescriptionRoleTextArea(props: DescriptionRoleTextAreaProps) {
  const { editProjectFormSteps } = useBoundStore(
    ({ editProjectFormSteps }) => ({
      editProjectFormSteps,
    }),
  )
  const { control } = useFormContext<JobFormInput>()
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
          id="role-description"
          onUpdateMarkdown={(value) => {
            onChange(value)
          }}
          onFocusMarkdown={() => {
            handleSetCurrentTarget('role-description')
          }}
          config={{
            editable:
              !editProjectFormSteps.job.editProjectJobSubmitIsLoading &&
              props.isProjectAuthorOrOwner,
            maxLength: MAX_LENGTH,
            className: '',
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
