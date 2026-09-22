import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { getPublishedBlogPosts } from '@/lib/blog'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Read Eslotmain Blog',
  description: 'Useful guides and ideas for shortening, organizing, and sharing links with Eslotmain.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogPosts()
  return (
    <main className="site-shell inner-page-shell">
      <SiteHeader />
      <div className="page-width blog-page">
        <p className="eyebrow">ESLOTMAIN / JOURNAL</p>
        <h1>All Published Articles on Eslotmain Blog</h1>
        <p className="blog-intro">Make your long links easier to manage, share, and understand. Explore product guides and simple workflows built around better link sharing.</p>
        <div className="blog-list">
          {blogPosts.map((post) => (
            <article className="blog-list-item" key={post.slug}>
              <div className="blog-list-meta"><time dateTime={post.publishedAt}>{post.publishedAt}</time><span>{post.readTime}</span></div>
              <div><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article →</Link></div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
