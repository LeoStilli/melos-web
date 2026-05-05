import { NextResponse, type NextRequest } from 'next/server'

import { SESSION_COOKIE, verifySessionValue } from '@/lib/auth/session'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuthPage = path === '/signin' || path === '/signup'

  const cookieValue = request.cookies.get(SESSION_COOKIE)?.value
  const userId = await verifySessionValue(cookieValue)
  const isAuthed = userId !== null

  if (!isAuthed && !isAuthPage) {
    const url = new URL('/signin', request.url)
    if (path !== '/') url.searchParams.set('next', path + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  if (isAuthed && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
