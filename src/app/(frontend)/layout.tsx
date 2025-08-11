import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.className)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href={getServerSideURL()} />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | Docmet - Modern Knowledge Management',
    default: 'Docmet - The Modern Alternative to Confluence',
  },
  description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless. Built for modern teams.',
  keywords: [
    'confluence alternative',
    'knowledge management',
    'team documentation',
    'AI-powered collaboration',
    'modern documentation',
    'team wiki',
    'enterprise knowledge base',
    'documentation platform',
    'collaborative writing',
    'semantic search'
  ],
  authors: [{ name: 'Docmet Team' }],
  creator: 'Docmet',
  publisher: 'Docmet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: mergeOpenGraph({
    title: 'Docmet - The Modern Alternative to Confluence',
    description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless.',
    url: getServerSideURL(),
    siteName: 'Docmet',
    type: 'website',
    locale: 'en_US',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Docmet - The Modern Alternative to Confluence',
    description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless.',
    creator: '@docmet',
    site: '@docmet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

