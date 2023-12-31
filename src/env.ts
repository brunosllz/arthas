import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_ACCESS_KEY: z.string().min(1),
    CLOUDFLARE_SECRET_KEY: z.string().min(1),
    CLOUDFLARE_PUBLIC_BUCKET_URL: z.string().min(1),
    CLOUDFLARE_UPLOAD_BUCKET_ID: z.string().min(1),
    CLOUDFLARE_UPLOAD_BUCKET_NAME: z.string().min(1),
    CLOUDFLARE_STORAGE_BUCKET_NAME: z.string().min(1),
    JWT_ALGORITHM: z.string(),
    JWT_SECRET: z.string(),
    NEXTAUTH_URL: z.string().optional().refine(requiredOnEnv('production')),
    NEXTAUTH_SECRET: z.string().optional().refine(requiredOnEnv('production')),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    FEATURE_SEARCH_BAR: z.coerce.number(),
    ROOT_PAGE_HREF: z.string().default('/'),
    FEATURE_HOME_PAGE: z.coerce.number(),
    FEATURE_DISCUSSIONS_PAGE: z.coerce.number(),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1).url(),
    NEXT_PUBLIC_EXTERNAL_API_URL: z.string().min(1).url(),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_EXTERNAL_API_URL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
})
