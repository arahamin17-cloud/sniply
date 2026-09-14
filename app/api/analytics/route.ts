import { NextResponse } from 'next/server'
import { getLinkByCode } from '@/lib/links'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')?.trim() ?? ''
  if (!/^[a-zA-Z0-9]{4,32}$/.test(code)) return NextResponse.json({ error: 'Enter a valid short code.' }, { status: 400 })

  try {
    const link = await getLinkByCode(code)
    if (!link) return NextResponse.json({ error: 'Short link not found.' }, { status: 404 })
    const supabase = await createClient()
    const { count, error } = await supabase.from('short_link_events').select('id', { count: 'exact', head: true }).eq('code', code)
    if (error) return NextResponse.json({ error: 'Analytics are not available for this link yet.' }, { status: 503 })
    return NextResponse.json({ clicks: count ?? 0, destination: link.destination })
  } catch {
    return NextResponse.json({ error: 'Analytics are not available right now.' }, { status: 503 })
  }
}
