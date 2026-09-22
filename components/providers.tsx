'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider, BaseStyles } from '@primer/react'
import { StyledComponentsRegistry } from './styled-components-registry'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider dynamic>
      <StyledComponentsRegistry>
        <ThemeProvider colorMode="night" dayScheme="light" nightScheme="dark" preventSSRMismatch>
          <BaseStyles>{children}</BaseStyles>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </ClerkProvider>
  )
}
