import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function NewProject() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">New project</h1>
          <span className="block text-muted-foreground">Add new project.</span>
        </div>

        <div className="space-x-3">
          <Button asChild variant="outline">
            <Link href="/me/projects">Cancel</Link>
          </Button>
          <Button asChild>
            <Link href="/me/projects/new">Save</Link>
          </Button>
        </div>
      </div>

      <Separator className="mt-4" />

      <form className="grid grid-cols-[1fr_15rem] divide-x">
        <div className="flex w-full flex-col gap-5 divide-y divide-border pt-8">
          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)] ">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Name
            </label>

            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Dev Xperience"
            />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <label
              htmlFor="description"
              className="flex flex-col text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Description
              <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                Write a short introduction.
              </span>
            </label>

            <Textarea
              name="description"
              id="description"
              placeholder="Dev Xperience"
            />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <label
              htmlFor="roles"
              className="flex flex-col text-sm font-medium"
            >
              Roles
              <span className="text-sm font-normal text-muted-foreground">
                Add amount and role name than your project need.
              </span>
            </label>

            <div className="flex flex-col">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                className="ml-auto"
              >
                <Plus size={12} className="mr-2" /> Add role
              </Button>

              <div className="space-y-4">
                <div className="col-start-2 mt-3 grid grid-cols-[minmax(1rem,4rem)_1fr] gap-4">
                  <div className="flex items-center space-x-1">
                    <Input
                      name="roles"
                      id="roles"
                      type="number"
                      placeholder="0"
                    />
                    <span className="text-sm text-muted-foreground">x</span>
                  </div>

                  <Input
                    name="Roles"
                    id="Roles"
                    type="Roles"
                    placeholder="Front-end"
                  />
                </div>

                <div className="col-start-2 grid grid-cols-[minmax(1rem,4rem)_1fr] gap-4">
                  <div className="flex items-center space-x-1">
                    <Input
                      name="Roles"
                      id="Roles"
                      type="Roles"
                      placeholder="0"
                    />
                    <span className="text-sm text-muted-foreground">x</span>
                  </div>

                  <Input
                    name="Roles"
                    id="Roles"
                    type="Roles"
                    placeholder="Front-end"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Technologies
            </label>

            <Input
              name="technologies"
              id="technologies"
              type="text"
              placeholder="Dev Xperience"
            />
          </div>

          <div className="grid grid-cols-[minmax(16rem,17rem)_minmax(17rem,32.5rem)]  pt-5">
            <label
              htmlFor="requirements"
              className="flex flex-col text-sm font-medium "
            >
              Requirements
              <span className="text-sm font-normal text-muted-foreground">
                add the requirements to participate in the project.
              </span>
            </label>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select period amount"
                      className="placeholder:text-muted-foreground"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select period identifier"
                      className="placeholder:text-muted-foreground"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                name="requirements"
                id="requirements"
                placeholder="Dev Xperience"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-start space-y-3 pl-8 pt-8">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Status
            </label>

            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select status of project"
                  className="placeholder:text-muted-foreground"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">📋 Draft</SelectItem>
                <SelectItem value="week">♻️ Recruiting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start space-y-3 pl-8 pt-5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Tags
            </label>

            <Button variant="secondary" size="sm" type="button">
              <Plus size={12} className="mr-2" /> Add tag
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
