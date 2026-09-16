'use client'

import Link from 'next/link'
import { SignIn, SignUp } from '@clerk/nextjs'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const isSignIn = mode === 'signin'

  return (
    <div className="auth-form-wrap auth-clerk-root">
      {isSignIn ? (
        <SignIn
          routing="path"
          path="/signin"
          signUpUrl="/signup"
          fallbackRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: 'auth-clerk-root',
              card: 'auth-clerk-card',
              headerTitle: 'auth-clerk-title',
              headerSubtitle: 'auth-clerk-subtitle',
              formFieldLabel: 'auth-clerk-label',
              formFieldInput: 'auth-clerk-input',
              footerActionLink: 'auth-clerk-link',
            },
          }}
        />
      ) : (
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/signin"
          fallbackRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: 'auth-clerk-root',
              card: 'auth-clerk-card',
              headerTitle: 'auth-clerk-title',
              headerSubtitle: 'auth-clerk-subtitle',
              formFieldLabel: 'auth-clerk-label',
              formFieldInput: 'auth-clerk-input',
              footerActionLink: 'auth-clerk-link',
            },
          }}
        />
      )}
      <p className="auth-switch">{isSignIn ? 'New to eslotmain.xyz?' : 'Already have an account?'}{' '}
        <Link href={isSignIn ? '/signup' : '/signin'}>{isSignIn ? 'Create an account' : 'Sign in'}</Link>
      </p>
    </div>
  )
}
