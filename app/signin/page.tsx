'use client'

import { FormEvent, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleFillIcon, LinkIcon, LockIcon, RocketIcon } from '@primer/octicons-react'
import Link from 'next/link'

export default function SigninPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-shell">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <nav className="auth-nav page-width">
        <Link className="brand" href="/" aria-label="eslotmain.xyz home"><span className="brand-mark"><LinkIcon size={17} /></span><span>eslotmain<span className="brand-dot">.</span>xyz</span></Link>
        <Link className="back-link" href="/"><ArrowLeftIcon size={14} /> Back to home</Link>
      </nav>

      <section className="auth-content page-width signin-content">
        <div className="auth-benefits">
          <div className="eyebrow"><span className="eyebrow-line" /> WELCOME BACK</div>
          <h1>Good to see<br /><span>you again.</span></h1>
          <p className="auth-intro">Pick up where you left off. Your links, insights, and next campaign are waiting.</p>
          <div className="signin-highlight"><span className="signin-highlight-icon"><RocketIcon size={17} /></span><div><strong>Your link workspace</strong><p>One calm place for every click that matters.</p></div></div>
        </div>

        <div className="auth-card">
          {submitted ? (
            <div className="signup-success"><CheckCircleFillIcon size={40} /><div className="eyebrow"><span className="eyebrow-line" /> SIGN-IN REQUEST RECEIVED</div><h2>Welcome back.</h2><p>Your sign-in request is ready. Connect this form to your authentication provider to complete login.</p><Link className="primary-button" href="/">Continue to homepage <ArrowRightIcon size={16} /></Link></div>
          ) : (
            <>
              <div className="auth-card-heading"><span className="auth-card-icon"><LockIcon size={17} /></span><div><h2>Sign in to your account</h2><p>Keep your links moving forward.</p></div></div>
              <form className="signup-form" onSubmit={handleSubmit}>
                <label>Work email<input type="email" name="email" placeholder="alex@company.com" required /></label>
                <label>Password<input type="password" name="password" placeholder="Enter your password" required /></label>
                <div className="form-options"><label className="checkbox-row"><input type="checkbox" /><span>Remember me</span></label><Link href="/forgot-password">Forgot password?</Link></div>
                <button className="primary-button" type="submit">Sign in <ArrowRightIcon size={16} /></button>
              </form>
              <div className="auth-divider"><span>New to eslotmain.xyz?</span></div>
              <Link className="outline-button outline-link" href="/signup">Create a free account</Link>
              <p className="secure-note"><LockIcon size={12} /> Your information is encrypted and never sold.</p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
