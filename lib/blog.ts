export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  readTime: string
  excerpt: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'bulk-url-shortener',
    title: 'How to Shorten Multiple URLs at Once with Eslotmain',
    description: 'Learn how Eslotmain’s bulk URL shortener helps you turn up to ten long links into clean, shareable short URLs in one submission.',
    publishedAt: '2026-09-14',
    updatedAt: '2026-09-14',
    readTime: '4 min read',
    excerpt: 'Managing several campaign links should not mean repeating the same task over and over. Eslotmain’s bulk URL shortener gives you a faster way to organize, shorten, and share multiple destinations from one focused workspace.',
    sections: [
      { heading: 'Why bulk shortening is useful', paragraphs: ['Long URLs are difficult to read, copy, and place in campaign materials. When a launch includes separate links for email, social, partners, and tracking variations, shortening each URL individually can quickly become repetitive.', 'A bulk workflow keeps those destinations together. You can review the full set before submitting, reduce manual switching, and leave with a clear list of short links ready to copy.'] },
      { heading: 'How Eslotmain bulk shortening works', paragraphs: ['Open the Bulk submit page from the site navigation and paste one destination URL per row. The tool accepts up to ten HTTP or HTTPS URLs in a single submission and validates each entry before it creates anything.', 'After submission, Eslotmain returns a short link for every valid destination. Existing destinations can be recognized and reused, helping avoid unnecessary duplicate links while keeping your workflow predictable.'] },
      { heading: 'A simple workflow for campaigns', paragraphs: ['Start by collecting the final destination URLs in a document or spreadsheet. Paste them into the bulk form, check that each link points to the intended page, and submit the group. Then copy the results into your campaign brief or publishing tool.', 'Because the output is presented as a clean list, it is easy to match each short URL with its original destination and share it with teammates.'] },
      { heading: 'Keep links clear and accountable', paragraphs: ['Short URLs are most useful when the destination pages are already final and tested. Use descriptive notes in your own campaign records, keep a copy of the original URLs, and avoid shortening links that contain sensitive information unless you understand the destination’s privacy implications.', 'Eslotmain is designed to make everyday link sharing faster. For a small batch of links, the bulk shortener provides a practical alternative to handling every URL one at a time.'] },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
