'use client'

import { useState } from 'react'

export default function AdminBlogEditor() {
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setStatus('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/admin/blog', { method: 'POST', body: form })
    const result = await response.json()
    setSaving(false)
    setStatus(response.ok ? 'Published successfully.' : result.error || 'Unable to publish.')
    if (response.ok) event.currentTarget.reset()
  }

  return <form className="admin-blog-form" onSubmit={submit}>
    <label>Title<input name="title" required placeholder="Your article title" /></label>
    <label>Slug<input name="slug" required pattern="[a-z0-9-]+" placeholder="your-article-slug" /></label>
    <label>Description<textarea name="description" required rows={2} placeholder="A concise description for search and sharing." /></label>
    <label>Excerpt<textarea name="excerpt" required rows={3} placeholder="A short introduction shown on the blog index." /></label>
    <label>Read time<input name="readTime" required defaultValue="5 min read" /></label>
    <label>Sections <span className="admin-help">One heading and paragraph per line, separated by a blank line.</span><textarea name="sections" required rows={14} placeholder={'Why this matters\n\nExplain the idea clearly.\n\nHow it works\n\nShare the practical steps.'} /></label>
    <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Publishing…' : 'Publish article'}</button>
    {status && <p role="status" className="admin-status">{status}</p>}
  </form>
}
