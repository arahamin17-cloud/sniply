import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminBlogEditor from '@/components/AdminBlogEditor'
import SiteHeader from '@/components/SiteHeader'

const ADMIN_EMAIL = 'arahamin17@gmail.com'

export default async function AdminBlogPage() {
  const user = await currentUser()
  const email = user?.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress
  if (email?.toLowerCase() !== ADMIN_EMAIL) redirect('/signin?callbackURL=/admin/blog')

  return <main className="site-shell inner-page-shell"><SiteHeader /><div className="page-width admin-page"><p className="eyebrow">ESLOTMAIN / ADMIN</p><h1>Publish a new article</h1><p className="admin-intro">Write, format, and publish directly to the public blog.</p><AdminBlogEditor /></div></main>
}
