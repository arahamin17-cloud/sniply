import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db'
import * as schema from '@/lib/db/schema'
import { Resend } from 'resend'

const resetSender = process.env.RESEND_EMAIL_DOMAIN ? `eslotmain <no-reply@${process.env.RESEND_EMAIL_DOMAIN}>` : 'eslotmain <onboarding@resend.dev>'

const origins = [
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', process.env.V0_RUNTIME_URL, process.env.V0_DEV_APP_URL, process.env.V0_BUILD_URL, process.env.V0_SANDBOX_URL] : []),
  ...(process.env.NODE_ENV === 'production' ? [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
  ] : []),
].filter((origin): origin is string => Boolean(origin))

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: { user: schema.user, session: schema.session, account: schema.account, verification: schema.verification } }),
  baseURL: process.env.BETTER_AUTH_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL),
  trustedOrigins: origins,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error } = await resend.emails.send({
        from: resetSender,
        to: [user.email],
        subject: 'Reset your eslotmain password',
        html: `<p>We received a request to reset your eslotmain password.</p><p><a href="${url}">Reset your password</a></p><p>If you did not request this, you can safely ignore this email.</p>`,
      }, { idempotencyKey: `password-reset/${user.id}/${new URL(url).searchParams.get('token') ?? 'request'}` })
      if (error) throw new Error('Unable to send password reset email')
    },
  },
  ...(process.env.NODE_ENV === 'development' ? {
    advanced: {
      defaultCookieAttributes: { sameSite: 'none' as const, secure: true },
    },
  } : {}),
})
