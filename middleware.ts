import { auth } from '@/lib/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/analytics')) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/signin'
  url.searchParams.set('callbackURL', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
