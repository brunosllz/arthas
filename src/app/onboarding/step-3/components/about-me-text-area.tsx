import { Editor } from '@/components/editor'
import { useController, useFormContext } from 'react-hook-form'
import { InputMessageError } from '@/components/ui/input'
import { ThirdStepInput } from './third-step-form'
import { useBoundStore } from '@/store'

interface RequirementsTextAreaProps {
  editable?: boolean
}

export function AboutMeTextArea({ editable }: RequirementsTextAreaProps) {
  const { control } = useFormContext<ThirdStepInput>()
  const { setUser, user } = useBoundStore((state) => {
    return {
      setUser: state.setUser,
      user: state.user,
    }
  })

  const {
    formState: { errors },
    field: { onChange, name, value },
  } = useController({
    name: 'aboutMe',
    control,
  })

  function onChangeInputValue(name: string, value: string) {
    setUser({
      [name]: value,
    })
  }

  const MAX_LENGTH = 1200

  return (
    <div className="space-y-1">
      <div className="relative">
        <Editor
          id="aboutMe"
          onUpdateMarkdown={(value) => {
            onChange(value)
            onChangeInputValue(name, value)
          }}
          config={{ editable, maxLength: MAX_LENGTH }}
          placeholderValue="Conte-nos sobre você"
          content={user.aboutMe ?? undefined}
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
        <InputMessageError>{errors.aboutMe.message}</InputMessageError>
      )}
    </div>
  )
}
