'use server'

import { cookies } from 'next/headers'

import { getCurrentUser } from '@/actions/get-current-user'
import { useBoundStore } from '..'
import {
  UserOnboardingInfos,
  onboardingUserCookiesTag,
} from '../slices/onboarding-slice'

export const addUserFromServerSideSession = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return
  }

  const savedUser = cookies().get(
    `${onboardingUserCookiesTag}:${currentUser.id}`,
  )?.value

  if (savedUser) {
    const user: UserOnboardingInfos = JSON.parse(savedUser)

    if (user.id === currentUser.id) {
      return useBoundStore.setState({
        user: {
          id: user.id,
          aboutMe: user.aboutMe ?? undefined,
          avatarUrl: user.avatarUrl,
          city: user.city ?? undefined,
          country: user.country ?? undefined,
          githubLink: user.githubLink ?? undefined,
          linkedinLink: user.linkedinLink ?? undefined,
          name: user.name,
          role: user.role ?? undefined,
          seniority: user.seniority ?? undefined,
          slugProfile: user.slugProfile,
          state: user.state ?? undefined,
          title: user.title ?? undefined,
          skills: user.skills,
        },
      })
    }
  }

  useBoundStore.setState({
    user: {
      id: currentUser.id,
      aboutMe: currentUser.about_me ?? undefined,
      avatarUrl: currentUser.avatar_url,
      city: currentUser.city ?? undefined,
      country: currentUser.country ?? undefined,
      githubLink: currentUser.github_link ?? undefined,
      linkedinLink: currentUser.linkedin_link ?? undefined,
      name: currentUser.name,
      role: currentUser.role ?? undefined,
      seniority: currentUser.seniority ?? undefined,
      slugProfile: currentUser.slug_profile,
      state: currentUser.state ?? undefined,
      title: currentUser.title ?? undefined,
      skills: currentUser.skills.map((skill) => skill.slug),
    },
  })
}
