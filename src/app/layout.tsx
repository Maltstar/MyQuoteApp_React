import '@/css/globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import { ContextProvider } from '@/context'
import AppFooter from './layout/AppFooter'

export const metadata: Metadata = {
  title: 'Quote App',
  description: 'A simple web app to read and write quote on the blockchain Sepolia Test network. Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        
        
        <ContextProvider initialState={initialState}>{children}</ContextProvider>
        <AppFooter/>
      </body>
    </html>
  )
}
