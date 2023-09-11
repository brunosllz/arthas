'use client'

import { useState } from 'react'
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
import { externalApi } from '@/libs/axios'
import { useSession } from 'next-auth/react'

const createNewProjectSchema = z
  .object({
    name: z.string().min(1, { message: 'Add a name to your project' }),
    image: z.string().url({ message: 'Should be a valid url' }).optional(),
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
      .length(1, { message: 'Add at least one role' }),

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
  const { uploadFile, publicUrl, addFile } = useUploadStore()
  const { data } = useSession()
  const userId = data?.user.uId
  const accessToken = data?.accessToken

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
      maxSize: 51_200, // 50kb
    })

  async function handleCreateNewProject(data: CreateNewProjectSchema) {
    const {
      description,
      meetingType,
      name,
      requirements,
      roles,
      status,
      technologies,
      meetingHour,
      meetingMonthDay,
      meetingWeekDay,
    } = data

    await externalApi.post(
      '/projects',
      {
        authorId: userId,
        description,
        name,
        imageUrl: publicUrl,
        status,
        requirements,
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
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    uploadFile()
  }

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
                {...register('name')}
              />
              {errors.name && (
                <InputMessageError>{errors.name.message}</InputMessageError>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="requirements" className="pr-4">
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
                uploadPrefix="projects"
                accept="image/*"
                {...getInputProps()}
              />
            </FileInputRoot>
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <Label htmlFor="description" className="pr-4">
              Description
              <LabelDescription>Write a short introduction.</LabelDescription>
            </Label>

            <DescriptionTextArea />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <Label htmlFor="roles" className="pr-4">
              Roles
              <LabelDescription>
                Add amount and role name than your project need.
              </LabelDescription>
            </Label>

            <RolesInput />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="technologies" className="pr-4">
              Technologies
            </Label>

            <TechnologiesInput />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="meeting" className="pr-4">
              Meeting
              <LabelDescription className="text-sm font-normal text-muted-foreground">
                Add when you will meet with your team.
              </LabelDescription>
            </Label>

            <MeetingSelectInput />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] pt-5">
            <Label htmlFor="requirements" className="pr-4">
              Requirements
              <LabelDescription>
                add the requirements to participate in the project.
              </LabelDescription>
            </Label>

            <RequirementsTextArea />
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
                  <Select value={value} onValueChange={onChange}>
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
