import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import { SharePost } from '@/components/BlogComponents'
import { getPublishedBlogPosts, getBlogPost } from '@/lib/blog'
import SiteHeader from '@/components/SiteHeader'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() { return (await getPublishedBlogPosts()).map((post) => ({ slug: post.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost((await params).slug)
  if (!post) return { title: 'Article not found' }
  return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.title, description: post.description, publishedTime: post.publishedAt, modifiedTime: post.updatedAt } }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost((await params).slug)
  if (!post) notFound()
  const article = post!
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt, author: { '@type': 'Organization', name: 'Eslotmain' }, publisher: { '@type': 'Organization', name: 'Eslotmain', url: 'https://eslotmain.xyz' }, mainEntityOfPage: `https://eslotmain.xyz/blog/${article.slug}` }

  return <main className="site-shell inner-page-shell"><SiteHeader /><article className="page-width blog-article"><p className="eyebrow">ESLOTMAIN / ARTICLE</p><h1>{article.title}</h1><p className="blog-article-description">{article.description}</p><div className="blog-list-meta"><time dateTime={article.publishedAt}>{article.publishedAt}</time><span>{article.readTime}</span></div><div className="article-body"><p>{article.excerpt}</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><SharePost title={article.title} slug={article.slug} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></article><Footer /></main>
}
