import { env } from '@/env'
import { redirect } from 'next/navigation'

export default function Home() {
  if (env.FEATURE_HOME_PAGE === 0) {
    return redirect(env.ROOT_PAGE_HREF)
  }

  return <div className="flex py-12 page-container">Home</div>
}
