import axios from 'axios'
import { create } from 'zustand'

type Upload = {
  file: File | null
  previewUrl: string | null
  signedUrl: string
  publicUrl: string

  addFile: ({
    file,
    uploadPrefix,
  }: {
    file: File
    uploadPrefix: 'avatar' | 'projects'
  }) => Promise<{ fileId: string }>
  uploadFile: () => Promise<void>
}

export const useUploadStore = create<Upload>((set, get) => {
  return {
    file: null,
    previewUrl: null,
    signedUrl: '',
    publicUrl: '',

    addFile: async ({
      file,
      uploadPrefix,
    }: {
      file: File
      uploadPrefix: 'avatar' | 'projects'
    }) => {
      const fileId = crypto.randomUUID()

      set({
        file,
        previewUrl: URL.createObjectURL(file),
      })

      const fileContentType = file.type.split('/')[1]

      const { data } = await axios.post('/api/uploads', {
        fileContentType,
        uploadPrefix,
      })

      const { signedUrl, publicUrl } = data

      set({
        signedUrl,
        publicUrl,
      })

      return { fileId }
    },

    uploadFile: async () => {
      const { signedUrl, file } = get()

      if (!file) {
        throw new Error('No file to upload')
      }

      try {
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  }
})
