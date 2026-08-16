import type { Metadata } from 'next'
import { ArrowLeftIcon, LinkIcon } from '@primer/octicons-react'
import BulkShortener from '@/components/BulkShortener'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Bulk URL shortener',
  description: 'Shorten up to 10 URLs at once with eslotmain.xyz.',
}

export default function BulkPage() {
  return (
    <main className="site-shell inner-page-shell">
      <nav className="topbar page-width" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="eslotmain.xyz home">
          <span className="brand-mark"><LinkIcon size={17} /></span>
          <span>eslotmain<span className="brand-dot">.</span>xyz</span>
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a className="nav-cta" href="/bulk">Bulk shortener</a>
        </div>
      </nav>
      <section className="bulk-page-intro page-width">
        <a className="back-link" href="/"><ArrowLeftIcon size={14} /> Back to home</a>
        <p className="eyebrow"><span className="eyebrow-line" /> BULK LINK WORKSPACE</p>
        <h1>Shorten your campaign links in one pass.</h1>
        <p>Submit up to 10 destinations together and keep every generated short link organized in one place.</p>
      </section>
      <BulkShortener />
      <Footer />
    </main>
  )
}
