import { createClient } from '@/lib/supabase/server'

const alphabet = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function createCode(length = 7) {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')
}

export type ShortLink = {
  id: string
  code: string
  destination: string
  created_at: string
}

export async function isDestinationTaken(destination: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('short_links').select('*').eq('destination', destination).maybeSingle()
  if (error) throw new Error('Unable to check link availability.')
  return data as ShortLink | null
}

export async function createLink(destination: string) {
  const supabase = await createClient()

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { data, error } = await supabase.from('short_links').insert({ code: createCode(), destination }).select('*').single()
    if (!error && data) return data as ShortLink
    if (error?.code !== '23505') throw new Error('Unable to create a short link.')
  }

  throw new Error('Unable to generate a unique short link. Please try again.')
}

export async function getLinkByCode(code: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('short_links').select('destination').eq('code', code).maybeSingle()
  if (error) throw new Error('Unable to look up this link.')
  return data as Pick<ShortLink, 'destination'> | null
}
