'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleFillIcon, LinkIcon, LockIcon, RocketIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import SiteHeader from '@/components/SiteHeader'

export default function SigninPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [walletLoading, setWalletLoading] = useState(false)

  async function handleWalletSignIn() {
    setErrorMessage('')
    setWalletLoading(true)
    try {
      const ethereum = (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum
      if (!ethereum) throw new Error('Install a compatible wallet to continue.')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[]
      const address = accounts[0]
      if (!address) throw new Error('No wallet account was selected.')
      const nonceResponse = await fetch('/api/auth/wallet/nonce', { cache: 'no-store' })
      if (!nonceResponse.ok) throw new Error('Could not start wallet verification.')
      const { nonce, domain, uri } = await nonceResponse.json() as { nonce: string; domain: string; uri: string }
      const issuedAt = new Date().toISOString()
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toISOString()
      const message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\nSign in to eslotmain.xyz.\n\nURI: ${uri}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${issuedAt}\nExpiration Time: ${expirationTime}`
      const signature = await ethereum.request({ method: 'personal_sign', params: [message, address] }) as string
      const verifyResponse = await fetch('/api/auth/wallet/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address, message, signature }) })
      if (!verifyResponse.ok) throw new Error('Wallet signature could not be verified.')
      setSubmitted(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Wallet sign-in failed.')
    } finally {
      setWalletLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setIsLoading(false)

    if (error) {
      const message = error.message.toLowerCase().includes('email not confirmed')
        ? 'Please confirm your email before signing in.'
        : error.status === 429
          ? 'Too many attempts. Please try again shortly.'
          : error.message.toLowerCase().includes('invalid login credentials')
            ? 'Invalid email or password.'
            : 'We could not sign you in. Please try again.'
      setErrorMessage(message)
      return
    }

    setSubmitted(true)
    router.refresh()
    router.push('/')
  }

  return (
    <main className="auth-shell">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <SiteHeader />

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
              <form className="signup-form" onSubmit={handleSubmit} aria-busy={isLoading}>
                {errorMessage ? <p className="form-error" role="alert">{errorMessage}</p> : null}
                <label>Work email<input type="email" name="email" placeholder="alex@company.com" required /></label>
                <label>Password<input type="password" name="password" placeholder="Enter your password" required /></label>
                <div className="form-options"><label className="checkbox-row"><input type="checkbox" /><span>Remember me</span></label><Link href="/forgot-password">Forgot password?</Link></div>
                <button className="primary-button" type="submit" disabled={isLoading}>{isLoading ? 'Signing in…' : 'Sign in'} <ArrowRightIcon size={16} /></button>
              </form>
              <button className="outline-button" type="button" onClick={handleWalletSignIn} disabled={walletLoading}>{walletLoading ? 'Verifying wallet…' : 'Sign in with wallet'}</button>
              <div className="auth-divider"><span>New to eslotmain.xyz?</span></div>
              <Link className="outline-button outline-link" href="/signup">Create a free account</Link>
              <p className="secure-note"><LockIcon size={12} /> Your information is encrypted and never sold.</p>
            </>
          )}
        </div>
      </section>
      <footer className="auth-footer page-width">
        <Link className="brand" href="/" aria-label="eslotmain.xyz home"><span className="brand-mark"><LinkIcon size={14} /></span><span>eslotmain<span className="brand-dot">.</span>xyz</span></Link>
        <div className="auth-footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/legal">Legal</Link><Link href="mailto:hello@eslotmain.xyz">Contact</Link></div>
        <span className="auth-footer-copy">© 2026 eslotmain.xyz</span>
      </footer>
    </main>
  )
}
