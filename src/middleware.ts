import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  if (req.nextUrl.pathname.startsWith('/auth') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: '/auth/sign-in',
      error: '/auth/error',
    },
  })

  // @ts-expect-error - conflict type request
  return authMiddleware(req, event)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
