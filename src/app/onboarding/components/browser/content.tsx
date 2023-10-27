'use client'

import { useBoundStore } from '@/store'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { GithubIcon, Linkedin, MapPin } from 'lucide-react'
import { MarkdownWrapper } from '@/components/markdown'

export function BrowserContent() {
  const user = useBoundStore((state) => state.user)

  console.log(user)

  return (
    <div className="space-y-6 rounded-lg border border-zinc-900 p-8">
      <div className="overflow-hidden rounded-lg border border-zinc-900">
        <div className="relative h-36 w-full bg-zinc-900">
          <div className="absolute -bottom-[44px] left-6">
            <Avatar size="xl" className="bg-zinc-900 ring-2 ring-black">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}

              <AvatarFallback className="rounded-full bg-zinc-900" />
            </Avatar>
          </div>
        </div>

        <div className="space-y-8 px-6 pb-6 pt-[4.25rem]">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              {user.name ? (
                <span className="block text-3xl font-semibold capitalize">
                  {user.name}
                </span>
              ) : (
                <div className="h-9 w-full max-w-[12.515625rem] rounded-full bg-zinc-900" />
              )}

              <div className="flex gap-3">
                {user.linkedinLink ? (
                  <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full border border-input bg-transparent shadow-sm">
                    <Linkedin size={18} />
                  </div>
                ) : (
                  <div className="h-[2.625rem] w-[2.625rem] rounded-full bg-zinc-900" />
                )}

                {user.githubLink ? (
                  <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full border border-input bg-transparent shadow-sm">
                    <GithubIcon size={18} />
                  </div>
                ) : (
                  <div className="h-[2.625rem] w-[2.625rem] rounded-full bg-zinc-900" />
                )}
              </div>
            </div>

            {user.title ? (
              <span className="block text-lg leading-none text-muted-foreground capitalize-first">
                {user.title}
              </span>
            ) : (
              <div className="h-[1.33625rem] w-full max-w-[17.64875rem] rounded-full bg-zinc-900" />
            )}
          </div>

          <div className="mt-4 flex gap-3">
            {user.role ? (
              <Badge variant="static" size="lg">
                {user.role}
              </Badge>
            ) : (
              <div className="h-[2.164375rem] w-full max-w-[7.703125rem] rounded-md bg-zinc-900" />
            )}

            {user.seniority ? (
              <Badge variant="static" size="lg">
                {user.seniority}
              </Badge>
            ) : (
              <div className="h-[2.164375rem] w-full max-w-[4.539375rem] rounded-md bg-zinc-900" />
            )}
          </div>

          <div className="mt-6 flex items-center space-x-1">
            {user.city ? (
              <div className="inline-flex items-center gap-2">
                <MapPin className="text-muted-foreground" size={14} />

                <span className="text-sm font-light text-zinc-500">
                  {user.city},
                </span>
              </div>
            ) : (
              <div className="h-[1.055rem] w-full max-w-[4.5rem] rounded-full bg-zinc-900" />
            )}

            {user.state ? (
              <span className="text-sm font-light text-zinc-500">
                {user.state},
              </span>
            ) : (
              <div className="h-[1.055rem] w-full max-w-[2.5rem] rounded-full bg-zinc-900" />
            )}

            {user.country ? (
              <span className="text-sm font-light text-zinc-500">
                {user.country}
              </span>
            ) : (
              <div className="h-[1.055rem] w-full max-w-[4.5rem] rounded-full bg-zinc-900" />
            )}
          </div>

          <Separator className="bg-zinc-900" />

          <div className="h-[1.055rem] w-full max-w-[8.789375rem] rounded-full bg-zinc-900" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-900 p-6">
        <div className="flex-row items-center justify-between pb-4">
          <h3 className="text-xl font-medium">Sobre</h3>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-1.5">
            {user.aboutMe ? (
              <MarkdownWrapper>{user.aboutMe}</MarkdownWrapper>
            ) : (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[1.055rem] w-full rounded-full bg-zinc-900"
                  />
                ))}
              </>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <strong className="text-lg font-medium">Habilidades</strong>

            {user.skills && user.skills?.length > 0 ? (
              <div className="space-x-3">
                {user.skills.map((skill: string) => (
                  <Badge key={skill} variant="static">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[1.375rem] w-full max-w-[5.8125rem] rounded-md bg-zinc-900 "
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
