import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'

import Link from 'next/link'
import { NewProjectForm } from './components/new-project-form'
import { Metadata } from 'next'
import { useUploadStore } from '@/store'

export const metadata: Metadata = {
  title: 'New Project',
}

export default function NewProject() {
  const { uploadStatus } = useUploadStore()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">New project</h1>
          <span className="block text-muted-foreground">Add new project.</span>
        </div>

        <div className="space-x-3">
          <Button asChild variant="outline">
            <Link href="/me/projects">Cancel</Link>
          </Button>
          <Button
            disabled={uploadStatus === 'submitting'}
            type="submit"
            form="new-project"
          >
            Save
          </Button>
        </div>
      </div>

      <Separator className="mt-4" />
      <NewProjectForm />
    </div>
  )
}
