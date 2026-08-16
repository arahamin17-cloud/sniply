'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleFillIcon, CheckIcon, LinkIcon, LockIcon, RocketIcon } from '@primer/octicons-react'
import Link from 'next/link'

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    const name = String(formData.get('name') ?? '')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
        data: { full_name: name },
      },
    })
    setIsLoading(false)

    if (error) {
      const lowerMessage = error.message.toLowerCase()
      const message = error.status === 429
        ? 'Too many attempts. Please try again shortly.'
        : lowerMessage.includes('password')
          ? error.message
          : lowerMessage.includes('already registered') || lowerMessage.includes('already been registered')
            ? 'This email may already be registered. Try signing in instead.'
            : 'We could not create your account. Please try again.'
      setErrorMessage(message)
      return
    }

    setSubmitted(true)
    if (data.session) window.location.assign('/')
  }

  return (
    <main className="auth-shell">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <nav className="auth-nav page-width">
        <Link className="brand" href="/" aria-label="eslotmain.xyz home"><span className="brand-mark"><LinkIcon size={17} /></span><span>eslotmain<span className="brand-dot">.</span>xyz</span></Link>
        <Link className="back-link" href="/"><ArrowLeftIcon size={14} /> Back to home</Link>
      </nav>

      <section className="auth-content page-width">
        <div className="auth-benefits">
          <div className="eyebrow"><span className="eyebrow-line" /> START YOUR LINK JOURNEY</div>
          <h1>Make every link<br /><span>work harder.</span></h1>
          <p className="auth-intro">Join teams using eslotmain.xyz to share smarter, understand their audience, and grow with confidence.</p>
          <div className="benefit-list">
            <Benefit text="Create unlimited personal links for free" />
            <Benefit text="See the clicks that matter most" />
            <Benefit text="Build trust with recognizable URLs" />
          </div>
          <div className="auth-note"><RocketIcon size={17} /><span>Set up your first link in less than a minute.</span></div>
        </div>

        <div className="auth-card">
          {submitted ? (
            <div className="signup-success"><CheckCircleFillIcon size={40} /><div className="eyebrow"><span className="eyebrow-line" /> YOU’RE ON YOUR WAY</div><h2>Welcome to the next click.</h2><p>Your account request is ready. Connect this form to your authentication provider to finish account creation.</p><Link className="primary-button" href="/">Back to homepage <ArrowRightIcon size={16} /></Link></div>
          ) : (
            <>
              <div className="auth-card-heading"><span className="auth-card-icon"><LockIcon size={17} /></span><div><h2>Create your account</h2><p>Start free. No credit card required.</p></div></div>
              <form className="signup-form" onSubmit={handleSubmit} aria-busy={isLoading}>
                {errorMessage ? <p className="form-error" role="alert">{errorMessage}</p> : null}
                <label>Full name<input type="text" name="name" placeholder="Alex Morgan" required /></label>
                <label>Work email<input type="email" name="email" placeholder="alex@company.com" required /></label>
                <label>Password<input type="password" name="password" placeholder="At least 8 characters" minLength={8} required /></label>
                <label className="checkbox-row"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span></label>
                <button className="primary-button" type="submit" disabled={isLoading}>{isLoading ? 'Creating account…' : 'Create free account'} <ArrowRightIcon size={16} /></button>
              </form>
              <div className="auth-divider"><span>Already have an account?</span></div>
              <Link className="outline-button outline-link" href="/signin">Sign in to your account</Link>
              <p className="secure-note"><LockIcon size={12} /> Your information is encrypted and never sold.</p>
            </>
          )}
        </div>
      </section>
      <footer className="auth-footer page-width">
        <Link className="brand" href="/" aria-label="eslotmain.xyz home"><span className="brand-mark"><LinkIcon size={14} /></span><span>eslotmain<span className="brand-dot">.</span>xyz</span></Link>
        <div className="auth-footer-links"><Link href="#privacy">Privacy</Link><Link href="#terms">Terms</Link><Link href="mailto:hello@eslotmain.xyz">Contact</Link></div>
        <span className="auth-footer-copy">© 2026 eslotmain.xyz</span>
      </footer>
    </main>
  )
}

function Benefit({ text }: { text: string }) {
  return <div className="benefit"><span><CheckIcon size={13} /></span><p>{text}</p></div>
}
