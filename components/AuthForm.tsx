'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, CheckCircleFillIcon } from '@primer/octicons-react'
import { authClient } from '@/lib/auth-client'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [googlePending, setGooglePending] = useState(false)
  const [error, setError] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')

    const result = mode === 'signup'
      ? await authClient.signUp.email({ name, email, password, callbackURL: '/' })
      : await authClient.signIn.email({ email, password, callbackURL: '/' })

    setPending(false)
    if (result.error) {
      setError(mode === 'signup' ? 'We could not create that account. Check your details and try again.' : 'That email or password is not correct.')
      return
    }

    if (mode === 'signup') setVerificationSent(true)
    else window.location.assign('/')
  }

  async function continueWithGoogle() {
    setGooglePending(true)
    setError('')
    const result = await authClient.signIn.social({ provider: 'google', callbackURL: '/' })
    if (result.error) {
      setGooglePending(false)
      setError('Google sign-in is unavailable right now. Please try email instead.')
    }
  }

  if (verificationSent) {
    return <div className="signup-success auth-inline-success"><CheckCircleFillIcon size={40} /><div className="eyebrow"><span className="eyebrow-line" /> VERIFY YOUR EMAIL</div><h2>Check your inbox.</h2><p>We sent a verification link to <strong>{email}</strong>. Verify your email to finish creating your account.</p><Link className="outline-button outline-link" href="/signin">Return to sign in</Link></div>
  }

  return (
    <div className="auth-form-wrap">
      <button className="outline-button google-button" type="button" onClick={continueWithGoogle} disabled={pending || googlePending}>
        <span className="google-mark" aria-hidden="true">G</span>
        {googlePending ? 'Connecting to Google…' : 'Continue with Google'}
      </button>
      <div className="auth-divider"><span>or use your email</span></div>
      <form className="signup-form" onSubmit={submit}>
        {mode === 'signup' && <label>Full name<input type="text" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" required /></label>}
        <label>Email address<input type="email" name="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@company.com" required /></label>
        <label>Password<input type="password" name="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required /></label>
        {mode === 'signin' && <Link className="auth-forgot" href="/forgot-password">Forgot your password?</Link>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit" disabled={pending || googlePending}>{pending ? (mode === 'signup' ? 'Creating account…' : 'Signing in…') : (mode === 'signup' ? 'Create account' : 'Sign in')} <ArrowRightIcon size={16} /></button>
      </form>
      <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to eslotmain.xyz?'} <Link href={mode === 'signup' ? '/signin' : '/signup'}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</Link></p>
    </div>
  )
}
