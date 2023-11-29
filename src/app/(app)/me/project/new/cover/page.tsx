import { Card, CardContent } from '@/components/ui/card'
import { CoverForm } from './components/cover-form'
import { SubmitButton } from './components/submit-button'

export default function CoverProject() {
  return (
    <div className="flex flex-col items-end gap-9">
      <Card className="w-full">
        <CardContent>
          <CoverForm />
        </CardContent>
      </Card>

      <SubmitButton form="cover-form">Avançar</SubmitButton>
    </div>
  )
}
