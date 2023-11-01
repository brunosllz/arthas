import { StateCreator } from 'zustand'
import { setCookie, destroyCookie } from 'nookies'
import { api } from '@/libs/axios'
import axios from 'axios'
import Compressor from 'compressorjs'
import { toast } from '@/components/ui/use-toast'

export type UserOnboardingInfos = {
  id: string
  name: string
  avatarUrl: string
  publicAvatarUrl: string | null
  signedAvatarUrl: string | null
  city: string
  state: string
  country: string
  linkedinLink: string
  githubLink: string
  aboutMe: string
  role: string
  skills: string[]
  seniority: string
  slugProfile: string
  title: string
}

export const onboardingUserCookiesTag = '@devxperience:onboarding'

export type OnboardingSlice = {
  user: Partial<UserOnboardingInfos>
  animatedBrowser: {
    x: number
    y: number
    scale: number
  }
  croppedAvatarImagePreviewURL: string | null
  croppedAvatarImagePreviewFile: File | null
  cropAvatarImageStatus: 'cropping' | 'cropped' | 'waiting' | 'loading'
  saveUserSubmitIsLoading: boolean
  getPreviewUrlFromBucket: ({
    imageFile,
    imageUrl,
  }: {
    imageUrl: string
    imageFile: File
  }) => Promise<void>
  setUser: (userInfos: Partial<UserOnboardingInfos>) => void
  saveUser: ({ leaveForLate }: { leaveForLate?: boolean }) => Promise<void>
}

const createOnboardingSlice: StateCreator<OnboardingSlice> = (set, get) => ({
  user: {},
  animatedBrowser: {
    x: 0,
    y: 0,
    scale: 1,
  },
  newAvatarImagePreview: null,
  croppedAvatarImagePreviewURL: null,
  croppedAvatarImagePreviewFile: null,
  cropAvatarImageStatus: 'waiting',
  saveUserSubmitIsLoading: false,
  setUser: (userInfos) => {
    set((state) => ({ user: { ...state.user, ...userInfos } }))

    const user = get().user

    setCookie(
      null,
      `${onboardingUserCookiesTag}:${user.id}`,
      JSON.stringify(user),
      {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      },
    )
  },
  saveUser: async ({ leaveForLate = false }) => {
    try {
      set({
        saveUserSubmitIsLoading: true,
      })

      const user = get().user

      await api.post(`/api/account/user/${user.id}/onboarding/save`, {
        name: user.name,
        avatarUrl: user.publicAvatarUrl ?? user.avatarUrl,
        city: user.city,
        state: user.state,
        country: user.country,
        linkedinLink: user.linkedinLink,
        githubLink: user.githubLink,
        aboutMe: leaveForLate ? '' : user.aboutMe,
        role: user.role,
        skills: leaveForLate ? [] : user.skills,
        seniority: user.seniority,
        slugProfile: user.slugProfile,
        title: user.title,
        onboard: new Date(),
      })

      if (user.signedAvatarUrl) {
        const file = get().croppedAvatarImagePreviewFile

        if (file) {
          await axios.put(user.signedAvatarUrl, file, {
            headers: {
              'Content-Type': file.type,
            },
          })
        }
      }

      destroyCookie(null, `${onboardingUserCookiesTag}:${user.id}`, {
        path: '/',
      })
    } catch (error) {
      console.error(error)

      set({
        saveUserSubmitIsLoading: false,
      })

      toast({
        title: 'Ocorreu um error ao salvar suas informações.',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  },
  async getPreviewUrlFromBucket({ imageFile, imageUrl }) {
    try {
      await new Promise((resolve) => {
        // eslint-disable-next-line no-new
        new Compressor(imageFile, {
          quality: 0.6,
          convertSize: 70000,
          success(file) {
            resolve(
              set({
                croppedAvatarImagePreviewFile: file as File,
              }),
            )
          },
        })
      })

      const fileContentType =
        get().croppedAvatarImagePreviewFile?.type.split('/')[1]

      const { data } = await axios.post('/api/uploads', {
        fileContentType,
        uploadPrefix: 'avatar',
      })

      const { signedUrl, publicUrl } = data

      set((state) => ({
        croppedAvatarImagePreviewURL: imageUrl,
        cropAvatarImageStatus: 'cropped',
        user: {
          ...state.user,
          avatarUrl: imageUrl,
          publicAvatarUrl: publicUrl,
          signedAvatarUrl: signedUrl,
        },
      }))
    } catch (error) {
      console.log(error)

      toast({
        title: 'Ocorreu um error ao editar a sua da foto de perfil.',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  },
})

export { createOnboardingSlice }
