import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'All Published Articles on Eslotmain Blog',
  description: 'Practical guides and ideas for shortening, organizing, and sharing links with Eslotmain.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return (
    <main className="site-shell inner-page-shell">
      <nav className="topbar page-width" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="eslotmain.xyz home"><span className="brand-mark">↗</span><span>eslotmain<span className="brand-dot">.</span>xyz</span></Link>
        <div className="nav-links"><Link href="/bulk">Bulk submit</Link><Link className="nav-signin" href="/signin">Sign in</Link></div>
      </nav>
      <div className="page-width blog-page">
        <p className="eyebrow">ESLOTMAIN / JOURNAL</p>
        <h1>All Published Articles on Eslotmain Blog</h1>
        <p className="blog-intro">Clear, practical ideas for making long links easier to manage, share, and understand. Explore product guides and simple workflows built around better link sharing.</p>
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
