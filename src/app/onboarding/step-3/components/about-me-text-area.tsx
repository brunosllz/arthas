import { Editor } from '@/components/editor'
import { useController, useFormContext } from 'react-hook-form'
import { InputMessageError } from '@/components/ui/input'
import { ThirdStepInput } from './third-step-form'
import { useBoundStore } from '@/store'

interface RequirementsTextAreaProps {
  disabled?: boolean
}

export function AboutMeTextArea({ disabled }: RequirementsTextAreaProps) {
  const { control } = useFormContext<ThirdStepInput>()
  const { addUserInfos, user } = useBoundStore((state) => {
    return {
      addUserInfos: state.addUserInfos,
      user: state.user,
    }
  })

  const {
    formState: { errors },
    field: { onChange, name },
  } = useController({
    name: 'aboutMe',
    control,
  })

  function onChangeInputValue(name: string, value: string) {
    addUserInfos({
      [name]: value,
    })
  }

  return (
    <div className="space-y-1">
      <Editor
        id="aboutMe"
        onUpdateMarkdown={(value) => {
          onChange(value)
          onChangeInputValue(name, value)
        }}
        disabled={disabled}
        placeholderValue="Conte-nos sobre você"
        content={user.aboutMe ?? undefined}
      />
      {errors.aboutMe && (
        <InputMessageError>{errors.aboutMe.message}</InputMessageError>
      )}
    </div>
  )
}
