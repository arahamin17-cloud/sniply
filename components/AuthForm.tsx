'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const result = mode === 'signup'
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })
    setPending(false)
    if (result.error) {
      setError('We could not complete that request. Check your details and try again.')
      return
    }
    router.push('/')
    router.refresh()
  }

  return <form className="auth-form" onSubmit={submit}>
    {mode === 'signup' && <label>Name<input required value={name} onChange={(event) => setName(event.target.value)} /></label>}
    <label>Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
    <label>Password<input required minLength={8} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="primary-button" type="submit" disabled={pending}>{pending ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}</button>
    <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to eslotmain.xyz?'} <Link href={mode === 'signup' ? '/signin' : '/signup'}>{mode === 'signup' ? 'Sign in' : 'Create one'}</Link></p>
  </form>
}
