import { getCurrentUser } from '@/actions/get-current-user'
import { useBoundStore } from '..'

export const addUserFromServerSideSession = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return
  }

  useBoundStore.setState({
    user: {
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
    },
  })
}
