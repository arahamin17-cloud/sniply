import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db'
import * as schema from '@/lib/db/schema'
import { Resend } from 'resend'

const resetSender = process.env.RESEND_EMAIL_DOMAIN ? `eslotmain <no-reply@${process.env.RESEND_EMAIL_DOMAIN}>` : 'eslotmain <onboarding@resend.dev>'

async function sendTransactionalEmail({ to, subject, html, idempotencyKey }: { to: string; subject: string; html: string; idempotencyKey: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({ from: resetSender, to: [to], subject, html }, { idempotencyKey })
  if (error) {
    logAuthError('Transactional email failed', error)
    throw new Error('Unable to send email')
  }
}

function logAuthError(label: string, error: unknown) {
  console.error(`[v0] ${label}`, error instanceof Error ? error.message : error)
}

const origins = [
  'http://localhost:3000',
  'https://eslotmain.xyz',
  process.env.BETTER_AUTH_URL,
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
].filter((origin): origin is string => Boolean(origin))

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: { user: schema.user, session: schema.session, account: schema.account, verification: schema.verification } }),
  baseURL: process.env.BETTER_AUTH_URL ?? 'https://eslotmain.xyz',
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: origins,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendTransactionalEmail({
        to: user.email,
        subject: 'Reset your eslotmain password',
        html: `<p>We received a request to reset your eslotmain password.</p><p><a href="${url}">Reset your password</a></p><p>If you did not request this, you can safely ignore this email.</p>`,
        idempotencyKey: `password-reset/${user.id}/${new URL(url).searchParams.get('token') ?? 'request'}`,
      })
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendTransactionalEmail({
        to: user.email,
        subject: 'Verify your eslotmain account',
        html: `<p>Welcome to eslotmain.</p><p>Please verify your email address to activate your account:</p><p><a href="${url}">Verify my email</a></p>`,
        idempotencyKey: `email-verification/${user.id}/${new URL(url).searchParams.get('token') ?? 'request'}`,
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  advanced: {
    database: { generateId: 'uuid' },
    ...(process.env.NODE_ENV === 'development' ? {
      defaultCookieAttributes: { sameSite: 'none' as const, secure: true },
    } : {}),
  },
})
