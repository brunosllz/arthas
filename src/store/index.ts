// import axios from 'axios'
import { create } from 'zustand'
import {
  OnboardingSlice,
  createOnboardingSlice,
} from './slices/onboarding-slice'
import {
  ProjectsSearchSlice,
  createProjectsSearchSlice,
} from './slices/projects-search-slice'

// type UploadStatus = 'waiting' | 'loaded' | 'submitting' | 'success' | 'error'

// type Upload = {
//   file: File | null
//   previewUrl: string | null
//   signedUrl: string
//   publicUrl: string
//   uploadStatus: UploadStatus

//   addFile: ({
//     file,
//     uploadPrefix,
//   }: {
//     file: File
//     uploadPrefix: 'avatar' | 'projects'
//   }) => Promise<{ fileId: string }>
//   uploadFile: () => Promise<void>
//   clearFile: () => void
//   setUploadStatus: (status: UploadStatus) => void
// }

// export const useUploadStore = create<Upload>((set, get) => {
//   return {
//     file: null,
//     previewUrl: null,
//     signedUrl: '',
//     publicUrl: '',
//     uploadStatus: 'waiting',

//     addFile: async ({
//       file,
//       uploadPrefix,
//     }: {
//       file: File
//       uploadPrefix: 'avatar' | 'projects'
//     }) => {
//       const fileId = crypto.randomUUID()

//       set({
//         file,
//         previewUrl: URL.createObjectURL(file),
//       })

//       const fileContentType = file.type.split('/')[1]

//       const { data } = await axios.post('/api/uploads', {
//         fileContentType,
//         uploadPrefix,
//       })

//       const { signedUrl, publicUrl } = data

//       set({
//         signedUrl,
//         publicUrl,
//         uploadStatus: 'loaded',
//       })

//       return { fileId }
//     },

//     clearFile: () => {
//       set({
//         file: null,
//         previewUrl: null,
//         signedUrl: '',
//         publicUrl: '',
//         uploadStatus: 'waiting',
//       })
//     },

//     uploadFile: async () => {
//       const { signedUrl, file } = get()

//       if (!file) {
//         set({
//           uploadStatus: 'error',
//         })

//         throw new Error('No file to upload')
//       }

//       try {
//         set({
//           uploadStatus: 'submitting',
//         })

//         await axios.put(signedUrl, file, {
//           headers: {
//             'Content-Type': file.type,
//           },
//         })
//       } catch (error) {
//         console.log(error)
//       }
//     },

//     setUploadStatus: (status: UploadStatus) => {
//       set({
//         uploadStatus: status,
//       })
//     },
//   }
// })

export const useBoundStore = create<OnboardingSlice & ProjectsSearchSlice>()(
  (...slices) => ({
    ...createOnboardingSlice(...slices),
    ...createProjectsSearchSlice(...slices),
  }),
)
