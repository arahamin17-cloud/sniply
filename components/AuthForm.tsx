'use client'

import { FormEvent, useState } from 'react'
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const { setActive } = useClerk()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      if (mode === 'signin') {
        if (!signIn) return
        const result = await signIn.create({ identifier: email, password })
        if (result.error) throw result.error
        if (signIn.status !== 'complete') throw new Error('Additional verification is required.')
        await setActive({ session: signIn.createdSessionId })
        router.replace('/')
        router.refresh()
        return
      }
      if (!signUp) return
      const result = await signUp.create({ emailAddress: email, password, firstName: name })
      if (result.error) throw result.error
      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId })
        router.replace('/')
        router.refresh()
      } else {
        setNeedsVerification(true)
      }
    } catch (caught) {
      const clerkError = caught as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'We could not complete that request. Check your details and try again.')
    } finally {
      setPending(false)
    }
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      if (!signUp) return
      const result = await signUp.verifications.verifyEmailCode({ code })
      if (result.error) throw result.error
      if (signUp.status !== 'complete') throw new Error('That verification code is not complete.')
      await setActive({ session: signUp.createdSessionId })
      router.replace('/')
      router.refresh()
    } catch (caught) {
      const clerkError = caught as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'We could not verify that code.')
    } finally {
      setPending(false)
    }
  }

  if (needsVerification) return <form className="auth-form" onSubmit={verify}><div className="auth-form-intro"><span className="eyebrow">CHECK YOUR INBOX</span><h1>Verify your email</h1><p>Enter the verification code Clerk sent to {email}.</p></div><div className="auth-form-fields"><label>Verification code<input required inputMode="numeric" value={code} onChange={(event) => setCode(event.target.value)} /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button auth-submit" type="submit" disabled={pending}>{pending ? 'Verifying…' : 'Verify email'}</button></form>

  return <form className="auth-form" onSubmit={submit}><div className="auth-form-intro"><span className="eyebrow">ESLOTMAIN / ACCOUNT</span><h1>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1><p>{mode === 'signup' ? 'Save links, monitor clicks, and keep your workflow moving.' : 'Sign in to manage your short links and view analytics.'}</p></div><div className="auth-form-fields">{mode === 'signup' && <label>Name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></label>}<label>Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input required minLength={8} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button auth-submit" type="submit" disabled={pending || (mode === 'signin' ? !signIn : !signUp)}>{pending ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}</button>{mode === 'signin' && <Link className="auth-forgot" href="/forgot-password">Forgot password?</Link>}<p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to eslotmain.xyz?'} <Link href={mode === 'signup' ? '/signin' : '/signup'}>{mode === 'signup' ? 'Sign in' : 'Create one'}</Link></p></form>
}
