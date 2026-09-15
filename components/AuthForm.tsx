'use client'

import { SignIn, SignUp } from '@clerk/nextjs'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const appearance = {
    elements: {
      rootBox: 'auth-clerk-root',
      card: 'auth-clerk-card',
      headerTitle: 'auth-clerk-title',
      headerSubtitle: 'auth-clerk-subtitle',
      formFieldLabel: 'auth-clerk-label',
      formFieldInput: 'auth-clerk-input',
      footerActionText: 'auth-clerk-footer',
      footerActionLink: 'auth-clerk-link',
      formButtonPrimary: 'primary-button',
      identityPreviewText: 'auth-clerk-footer',
      formFieldWarningText: 'form-error',
      formFieldErrorText: 'form-error',
    },
  }

  if (mode === 'signup') {
    return <SignUp routing="hash" signInUrl="/signin" appearance={appearance} />
  }

  return <SignIn routing="hash" signUpUrl="/signup" appearance={appearance} />
}
