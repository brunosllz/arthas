'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'

import {
  FileInputControl,
  FileInputImagePreview,
  FileInputRoot,
  FileInputTrigger,
} from '@/components/file-input'
import { Input, InputMessageError } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TechnologiesInput } from './technologies-input'
import { RolesInput } from './roles-input'
import { Label, LabelDescription } from '@/components/ui/label'
import { DescriptionTextArea } from './description-text-area'
import { RequirementsTextArea } from './requirements-text-area'

import { useUploadStore } from '@/store'
import {
  MEETING_TYPES,
  MeetingSelectInput,
  WEEK_DAYS,
} from './meeting-select-input'
import { clientExternalApi } from '@/libs/axios'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

const createNewProjectSchema = z
  .object({
    name: z.string().min(1, { message: 'Add a name to your project' }),
    description: z
      .string({ required_error: 'Add a description' })
      .min(5, { message: 'Must have at least 5 characters' }),
    meetingType: z.enum(MEETING_TYPES, {
      required_error: 'Select a meeting type',
    }),
    meetingWeekDay: z
      .enum(WEEK_DAYS, { required_error: 'Select a week day' })
      .optional(),
    meetingMonthDay: z.string().optional(),
    meetingHour: z.string().optional(),
    technologies: z
      .array(z.string(), { required_error: 'Select a technology' })
      .min(1, { message: 'Add a technology' }),
    status: z.enum(['draft', 'recruiting'], {
      required_error: 'Select a status',
    }),
    roles: z
      .array(
        z
          .object(
            {
              name: z.string().min(1, { message: 'Add role name' }),
              amount: z.coerce
                .number()
                .min(1, { message: 'Amount should be grant than 1' })
                .nullable(),
            },
            { required_error: 'Add a role' },
          )
          .refine((value) => value.amount !== null && value.name.length > 1, {
            message: 'Add amount and role name',
            path: ['amount'],
          }),
      )
      .min(1, { message: 'Add at least one role' }),

    requirements: z
      .string({ required_error: 'Add requirements' })
      .min(5, { message: 'Must have at least 5 characters' }),
  })
  .superRefine((value, ctx) => {
    if (value.meetingType === 'daily' && !value.meetingHour) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a meeting hour',
        fatal: true,
        path: ['meetingHour'],
      })
    }

    if (value.meetingType === 'weekly' && !value.meetingHour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a meeting hour',
        fatal: true,
        path: ['meetingHour'],
      })
    }

    if (value.meetingType === 'weekly' && !value.meetingWeekDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a meeting week day',
        fatal: true,
        path: ['meetingWeekDay'],
      })
    }

    if (value.meetingType === 'monthly' && !value.meetingMonthDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a meeting month day',
        fatal: true,
        path: ['meetingMonthDay'],
      })
    }

    if (value.meetingType === 'monthly' && !value.meetingHour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a meeting hour',
        fatal: true,
        path: ['meetingHour'],
      })
    }
  })

export type CreateNewProjectSchema = z.infer<typeof createNewProjectSchema>

const defaultValues: Partial<CreateNewProjectSchema> = {
  roles: [{ name: '', amount: null }],
}

export function NewProjectForm() {
  const newProjectForm = useForm<CreateNewProjectSchema>({
    defaultValues,
    resolver: zodResolver(createNewProjectSchema),
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = newProjectForm

  const [inputFileMessageError, setInputFileMessageError] = useState('')
  const { uploadFile, publicUrl, addFile, clearFile, setUploadStatus } =
    useUploadStore()
  const router = useRouter()
  const { data } = useSession()
  const user = data?.user

  const {
    mutateAsync: createNewProject,
    isPending: isPendingCreateNewProject,
  } = useMutation({
    mutationFn: async ({
      meetingType,
      roles,
      technologies,
      meetingHour,
      meetingMonthDay,
      meetingWeekDay,
      ...props
    }: CreateNewProjectSchema) => {
      await clientExternalApi.post(
        '/projects',
        {
          ...props,
          authorId: user?.uId,
          imageUrl: publicUrl,
          meeting: {
            type: meetingType,
            occurredTime: meetingHour,
            date: meetingWeekDay ?? meetingMonthDay,
          },
          roles: roles.map((role) => ({
            name: role.name,
            membersAmount: role.amount,
          })),
          technologies: technologies.map((technology) => ({
            slug: technology,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
    },
    onSuccess() {
      toast({
        title: 'Project created successfully.',
        description: `You can see it in your projects page.`,
        variant: 'default',
      })
    },
  })

  const { getInputProps, getRootProps, fileRejections, isDragActive } =
    useDropzone({
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.svg+xml'],
      },
      async onDrop(acceptedFiles, fileRejections) {
        const fileErrors = fileRejections[0]?.errors[0]

        if (fileErrors) {
          switch (fileErrors.code) {
            case 'file-too-large':
              setInputFileMessageError(
                'File is too large, should be less than 50KB',
              )
              return
            case 'file-invalid-type':
              setInputFileMessageError('Invalid file type, should be an image')
              return
            default:
              return setInputFileMessageError('')
          }
        }

        const file = acceptedFiles[0]

        await addFile({
          file,
          uploadPrefix: 'projects',
        })
        setInputFileMessageError('')
      },
      disabled: isPendingCreateNewProject,
      maxSize: 51_200, // 50kb
    })

  async function handleCreateNewProject(data: CreateNewProjectSchema) {
    try {
      setUploadStatus('submitting')
      await createNewProject(data)
      uploadFile()
      router.push('/me/projects')
    } catch (error) {
      if (error instanceof AxiosError) {
        setUploadStatus('error')
        if (
          error.status === 409 &&
          error.response?.data.message === 'Project already exists'
        ) {
          return toast({
            title: 'Project already exists.',
            description: `You have a project with this name`,
            variant: 'destructive',
          })
        }
      }

      toast({
        title: 'Uh oh! Something went wrong.',
        description: `An error ocurred while create a project.`,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    clearFile()
  }, [clearFile])

  return (
    <FormProvider {...newProjectForm}>
      <form
        onSubmit={handleSubmit(handleCreateNewProject)}
        id="new-project"
        className="grid grid-cols-[1fr_15rem] divide-x"
      >
        <div className="flex w-full flex-col gap-5 divide-y divide-border pt-8">
          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]">
            <Label htmlFor="name" className="pr-4">
              Name
            </Label>

            <div className="space-y-1">
              <Input
                id="name"
                type="text"
                placeholder="Dev Xperience"
                disabled={isPendingCreateNewProject}
                {...register('name')}
              />
              {errors.name && (
                <InputMessageError>{errors.name.message}</InputMessageError>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="image" className="pr-4">
              Your brand photo
              <LabelDescription>
                This will be displayed on your project banner.
              </LabelDescription>
            </Label>

            <FileInputRoot
              id="image"
              className="flex flex-col items-start gap-5 lg:flex-row"
            >
              <FileInputImagePreview />
              <FileInputTrigger
                data-drag-active={isDragActive}
                {...getRootProps()}
              >
                {fileRejections && (
                  <InputMessageError>{inputFileMessageError}</InputMessageError>
                )}
              </FileInputTrigger>

              <FileInputControl
                accept="image/*"
                {...getInputProps({ id: 'image' })}
              />
            </FileInputRoot>
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <Label htmlFor="description" className="pr-4">
              Description
              <LabelDescription>Write a short introduction.</LabelDescription>
            </Label>

            <DescriptionTextArea disabled={isPendingCreateNewProject} />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <Label htmlFor="roles" className="pr-4">
              Roles
              <LabelDescription>
                Add amount and role name than your project need.
              </LabelDescription>
            </Label>

            <RolesInput disabled={isPendingCreateNewProject} />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="technologies" className="pr-4">
              Technologies
            </Label>

            <TechnologiesInput disabled={isPendingCreateNewProject} />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="meeting" className="pr-4">
              Meeting
              <LabelDescription className="text-sm font-normal text-muted-foreground">
                Add when you will meet with your team.
              </LabelDescription>
            </Label>

            <MeetingSelectInput disabled={isPendingCreateNewProject} />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="requirements" className="pr-4">
              Requirements
              <LabelDescription>
                add the requirements to participate in the project.
              </LabelDescription>
            </Label>

            <RequirementsTextArea disabled={isPendingCreateNewProject} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-start space-y-3 pl-8 pt-8">
            <Label htmlFor="status" className="pr-4">
              Status
            </Label>

            <Controller
              name="status"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-1">
                  <Select
                    value={value}
                    onValueChange={onChange}
                    disabled={isPendingCreateNewProject}
                  >
                    <SelectTrigger id="status">
                      <SelectValue
                        placeholder="Select status of project"
                        className="placeholder:text-muted-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">📋 Draft</SelectItem>
                      <SelectItem value="recruiting">♻️ Recruiting</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.status && (
                    <InputMessageError>
                      {errors.status.message}
                    </InputMessageError>
                  )}
                </div>
              )}
            />
          </div>

          {/* TODO: Future implementation: turn possible to put tags in a project */}
          {/* <div className="flex flex-col items-start space-y-3 pl-8 pt-5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Tags
            </label>

            <Button variant="secondary" size="sm" type="button">
              <Plus size={12} className="mr-2" /> Add tag
            </Button>
          </div> */}
        </div>
      </form>
    </FormProvider>
  )
}
