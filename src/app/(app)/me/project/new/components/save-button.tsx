'use client'

import { useUploadStore } from '@/store'
import { Button } from '@/components/ui/button'

export function SaveButton() {
  const uploadStatus = useUploadStore((store) => store.uploadStatus)

  return (
    <Button
      disabled={uploadStatus === 'submitting'}
      type="submit"
      form="new-project"
    >
      Save
    </Button>
  )
}
