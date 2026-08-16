'use client'

import { useState } from 'react'
import {
  Button,
  Heading,
  Label,
  Link,
  Stack,
  Text,
  TextInput,
} from '@primer/react'
import {
  ArrowRightIcon,
  CheckCircleFillIcon,
  CopyIcon,
  GraphIcon,
  LinkIcon,
  ZapIcon,
} from '@primer/octicons-react'

export default function Page() {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState(false)
  const [copied, setCopied] = useState(false)

  function shortenUrl() {
    if (!url.trim()) return
    setShortened(true)
    setCopied(false)
  }

  async function copyUrl() {
    await navigator.clipboard?.writeText('eslotmain.xyz/launch-kit')
    setCopied(true)
  }

  return (
    <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <header
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="horizontal" gap="condensed" align="center">
          <Stack
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 2,
              backgroundColor: 'accent.emphasis', color: 'fg.onEmphasis',
            }}
          >
            <LinkIcon size={18} />
          </Stack>
          <Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: '-0.02em' }}>eslotmain.xyz</Text>
        </Stack>
        <Stack direction="horizontal" gap="normal" align="center">
          <Link href="#features" muted>Features</Link>
          <Link href="#analytics" muted>Analytics</Link>
          <Button variant="invisible" size="small">Sign in</Button>
          <Button variant="primary" size="small">Get started</Button>
        </Stack>
      </header>

      <section
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '72px 24px 64px',
          position: 'relative',
        }}
      >
        <div className="heroGlow" aria-hidden="true" />
        <Stack direction="vertical" gap="spacious" align="center" style={{ position: 'relative' }}>
          <Stack direction="vertical" gap="normal" align="center" style={{ textAlign: 'center', maxWidth: 760 }}>
            <Label variant="accent">LINKS, BUT BETTER</Label>
            <Heading as="h1" variant="large" style={{ fontSize: 64, lineHeight: 1.04, letterSpacing: '-0.045em' }}>
              Short links.
              <br />Big possibilities.
            </Heading>
            <Text style={{ color: 'fg.muted', fontSize: 18, maxWidth: 620, lineHeight: 1.5 }}>
              Turn long, messy URLs into memorable links your audience will actually trust — and get the insights to make every click count.
            </Text>
          </Stack>

          <Stack
            style={{ width: '100%', maxWidth: 760, p: [2, 3], border: '1px solid', borderColor: 'border.default', borderRadius: 3, backgroundColor: 'canvas.overlay', boxShadow: 'shadow.large' }}
          >
            <Stack direction="horizontal" gap="condensed">
              <TextInput
                aria-label="Paste a long URL"
                block
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Paste your long URL here..."
                leadingVisual={LinkIcon}
                style={{ flex: 1 }}
              />
              <Button variant="primary" size="large" onClick={shortenUrl} trailingVisual={ArrowRightIcon}>Shorten URL</Button>
            </Stack>
            {shortened && (
              <Stack direction="horizontal" align="center" justify="space-between" style={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'border.muted' }}>
                <Stack direction="horizontal" gap="condensed" align="center">
                  <CheckCircleFillIcon fill="var(--fgColor-open)" />
                  <Text style={{ fontFamily: 'mono', color: 'accent.fg' }}>eslotmain.xyz/launch-kit</Text>
                </Stack>
                <Button variant="invisible" size="small" leadingVisual={CopyIcon} onClick={copyUrl}>{copied ? 'Copied' : 'Copy link'}</Button>
              </Stack>
            )}
          </Stack>
          <Text style={{ color: 'fg.muted', fontSize: 12 }}>Free forever for personal links · No credit card required</Text>
        </Stack>
      </section>

      <section id="features" style={{ maxWidth: 1180, margin: '0 auto', padding: '32px 24px 96px' }}>
        <Stack direction="horizontal" gap="normal">
          <Feature icon={ZapIcon} eyebrow="EFFORTLESS" title="One link, everywhere" text="Create clean, shareable links in seconds. Make every URL look like it belongs to your brand." />
          <Feature icon={GraphIcon} eyebrow="INSIGHTFUL" title="Know what works" text="See clicks, locations, devices, and referrers at a glance. Make decisions with real data." />
          <Feature icon={LinkIcon} eyebrow="ON BRAND" title="Built to be remembered" text="Use custom slugs and branded domains to turn a link into a recognizable part of your identity." />
        </Stack>
      </section>

      <section id="analytics" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 120px' }}>
        <Stack style={{ border: '1px solid', borderColor: 'border.default', borderRadius: 3, backgroundColor: 'canvas.subtle', p: [3, 5] }}>
          <Stack direction="horizontal" gap="spacious" align="center" justify="space-between">
            <Stack direction="vertical" gap="normal" style={{ maxWidth: 430 }}>
              <Label variant="accent">LINK INTELLIGENCE</Label>
              <Heading as="h2" style={{ fontSize: 40, letterSpacing: '-0.03em' }}>Every click tells a story.</Heading>
              <Text style={{ color: 'fg.muted', fontSize: 16, lineHeight: 1.5 }}>A simple dashboard that helps you understand your audience and grow what matters.</Text>
              <Button variant="primary" trailingVisual={ArrowRightIcon} style={{ alignSelf: 'flex-start' }}>Explore analytics</Button>
            </Stack>
            <Stack style={{ width: '100%', maxWidth: 520, overflow: 'hidden', border: '1px solid', borderColor: 'border.default', borderRadius: 2, backgroundColor: 'canvas.default', boxShadow: 'shadow.medium' }}>
              <img src="/campaign-overview.png" alt="Sample campaign overview dashboard showing link performance analytics" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </Stack>
          </Stack>
        </Stack>
      </section>

      <footer style={{ borderTop: '1px solid var(--borderColor-default)', padding: '24px', textAlign: 'center' }}>
        <Text style={{ color: 'fg.muted', fontSize: 12 }}>© 2026 eslotmain.xyz · Shorter links. Smarter growth.</Text>
      </footer>
    </main>
  )
}

function Feature({ icon: Icon, eyebrow, title, text }: { icon: typeof ZapIcon; eyebrow: string; title: string; text: string }) {
  return <Stack style={{ flex: 1, p: 4, border: '1px solid', borderColor: 'border.default', borderRadius: 2, backgroundColor: 'canvas.default' }}><Stack direction="vertical" gap="normal"><Icon size={24} fill="var(--fgColor-accent)" /><Label variant="accent">{eyebrow}</Label><Heading as="h3" style={{ fontSize: 20 }}>{title}</Heading><Text style={{ color: 'fg.muted', lineHeight: 1.5 }}>{text}</Text></Stack></Stack>
}

