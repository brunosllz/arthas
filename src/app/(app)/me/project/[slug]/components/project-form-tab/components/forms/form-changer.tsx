'use client'

import { useBoundStore } from '@/store'
import { CoverForm } from './cover-form'
import { ProjectDetails } from '../../../../page'
import { DescriptionForm } from './description-form'
import { JobFormTabs } from './job-form-tabs'

type FormChangerProps = {
  project: ProjectDetails
  isProjectAuthorOrOwner: boolean
}

export function FormChanger({
  project,
  isProjectAuthorOrOwner,
}: FormChangerProps) {
  const { currentFormSelectedFromEditTab } = useBoundStore(
    ({ currentFormSelectedFromEditTab }) => ({
      currentFormSelectedFromEditTab,
    }),
  )

  const availableTimeValue = project.availableTime.split('hr')[0]

  return (
    <>
      {currentFormSelectedFromEditTab === 'cover' ? (
        <CoverForm
          isProjectAuthorOrOwner={isProjectAuthorOrOwner}
          projectId={project.id}
          name={project.name}
          avatarUrl={project.imageUrl}
          bannerUrl={project.bannerUrl}
          availableToParticipate={{
            availableTime: {
              value: Number(availableTimeValue),
              unit: 'hour',
            },
          }}
        />
      ) : currentFormSelectedFromEditTab === 'description' ? (
        <DescriptionForm
          isProjectAuthorOrOwner={isProjectAuthorOrOwner}
          projectName={project.name}
          projectId={project.id}
          description={project.description}
          skills={project.skills}
        />
      ) : (
        <JobFormTabs isProjectAuthorOrOwner={isProjectAuthorOrOwner} />
      )}
    </>
  )
}
