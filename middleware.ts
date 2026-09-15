import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/analytics')) {
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    url.searchParams.set('callbackURL', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/analytics/:path*'],
}
