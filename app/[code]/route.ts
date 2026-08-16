import { NextResponse } from 'next/server'
import { getLinkByCode } from '@/lib/links'

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  if (!/^[a-zA-Z0-9]{4,32}$/.test(code)) return NextResponse.redirect(new URL('/', request.url))

  try {
    const link = await getLinkByCode(code)
    if (!link) return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.redirect(link.destination, 302)
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
