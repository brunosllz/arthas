import { Card, CardContent } from '@/components/ui/card'
import { DescriptionForm } from './components/description-form'
import { BackButton } from '../components/back-button'
import { SubmitButton } from './components/submit-button'
import { cookies } from 'next/headers'
import { NEW_PROJECT_COOKIES_ID } from '../layout'
import { redirect } from 'next/navigation'

export default function DescriptionProject() {
  const cookiesStore = cookies()

  const newProjectFormId = cookiesStore.get(NEW_PROJECT_COOKIES_ID)

  if (!newProjectFormId) {
    return redirect('/me/project/new/cover')
  }

  return (
    <div className="flex flex-col items-end gap-9">
      <Card className="w-full">
        <CardContent>
          <DescriptionForm />
        </CardContent>
      </Card>

      <div className="flex w-full items-center justify-between">
        <BackButton />

        <SubmitButton form="description-form">Avançar</SubmitButton>
      </div>
    </div>
  )
}
