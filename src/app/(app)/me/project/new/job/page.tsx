import { getRolesItensFromCms } from '@/actions/get-roles-itens-from-cms'
import { cookies } from 'next/headers'
import { NEW_PROJECT_COOKIES_ID } from '../layout'
import { redirect } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '../components/back-button'
import { JobTabs } from './components/job-tabs'
import { InitializerNewProjectStore } from './components/initializer-new-project-store'
import { SubmitButton } from './components/submit-button'

export default async function JobProject() {
  const { roles } = await getRolesItensFromCms()
  const cookiesStore = cookies()

  const newProjectFormId = cookiesStore.get(NEW_PROJECT_COOKIES_ID)

  if (!newProjectFormId) {
    return redirect('/me/project/new/cover')
  }

  const newProjectFormIdParsed: {
    [key: string]: string
    cover: string
    description: string
  } = JSON.parse(newProjectFormId.value)

  if (!newProjectFormIdParsed.description) {
    return redirect('/me/project/new/description')
  }

  return (
    <>
      <InitializerNewProjectStore roleItens={roles} />
      <div className="flex flex-col items-end gap-9">
        <Card className="w-full pt-5">
          <CardContent>
            <JobTabs />
          </CardContent>
        </Card>

        <div className="flex w-full items-center justify-between">
          <BackButton />

          <SubmitButton>Publicar projeto</SubmitButton>
        </div>
      </div>
    </>
  )
}
