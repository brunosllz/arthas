import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: any) => {
    if (env === process.env.NODE_ENV && !value) {
      return false
    }

    return true
  }
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1).url(),
    JWT_ALGORITHM: z.string().refine(requiredOnEnv('production')),
    JWT_SECRET: z.string().refine(requiredOnEnv('production')),
    NEXTAUTH_URL: z.string().optional().refine(requiredOnEnv('production')),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1).url(),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
})
