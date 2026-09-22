import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'

const ADMIN_EMAIL = 'arahamin17@gmail.com'

export async function POST(request: Request) {
  const user = await currentUser()
  const email = user?.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress
  if (email?.toLowerCase() !== ADMIN_EMAIL) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const form = await request.formData()
  const title = String(form.get('title') || '').trim()
  const slug = String(form.get('slug') || '').trim().toLowerCase()
  const description = String(form.get('description') || '').trim()
  const excerpt = String(form.get('excerpt') || '').trim()
  const readTime = String(form.get('readTime') || '').trim()
  const rawSections = String(form.get('sections') || '').trim()
  if (!title || !/^[a-z0-9-]+$/.test(slug) || !description || !excerpt || !readTime || !rawSections) return NextResponse.json({ error: 'Complete every field and use a lowercase slug.' }, { status: 400 })

  const blocks = rawSections.split(/\n\s*\n/).map((block) => block.split('\n').map((line) => line.trim()).filter(Boolean)).filter((lines) => lines.length >= 2)
  const sections = blocks.map(([heading, ...paragraphs]) => ({ heading, paragraphs }))
  if (!sections.length) return NextResponse.json({ error: 'Add at least one section with a heading and paragraph.' }, { status: 400 })

  const today = new Date().toISOString().slice(0, 10)
  try {
    await db.insert(blogPosts).values({ slug, title, description, publishedAt: today, updatedAt: today, readTime, excerpt, sections }).onConflictDoUpdate({ target: blogPosts.slug, set: { title, description, updatedAt: today, readTime, excerpt, sections } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'The article could not be saved.' }, { status: 500 })
  }
}
