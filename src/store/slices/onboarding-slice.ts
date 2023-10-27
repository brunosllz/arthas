import { StateCreator } from 'zustand'

export type UserOnboardingInfos = {
  name: string
  avatarUrl: string
  city: string
  state: string
  country: string
  linkedinLink: string
  githubLink: string
  aboutMe: string
  role: string
  seniority: string
  slugProfile: string
  title: string
  skills: string[]
}

export type OnboardingSlice = {
  user: Partial<UserOnboardingInfos>
  addUserInfos: (userInfos: Partial<UserOnboardingInfos>) => void
  animatedBrowser: {
    x: number
    y: number
    scale: number
  }
}

const createOnboardingSlice: StateCreator<OnboardingSlice> = (set) => ({
  user: {},
  animatedBrowser: {
    x: 0,
    y: 0,
    scale: 1,
  },
  addUserInfos: (userInfos) =>
    set((state) => ({ user: { ...state.user, ...userInfos } })),
})

export { createOnboardingSlice }
