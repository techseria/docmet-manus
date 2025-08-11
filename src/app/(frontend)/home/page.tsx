import React from 'react'
import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { SocialProof } from '@/components/SocialProof'
import { ProblemStatement } from '@/components/ProblemStatement'
import { SolutionOverview } from '@/components/SolutionOverview'
import { FeaturesShowcase } from '@/components/FeaturesShowcase'
import { PricingTeaser } from '@/components/PricingTeaser'
import { CallToAction } from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Docmet - The Modern Alternative to Confluence',
  description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless. Built for modern teams.',
  keywords: [
    'confluence alternative',
    'knowledge management platform',
    'team documentation',
    'AI-powered collaboration',
    'modern documentation tool',
    'team wiki software',
    'enterprise knowledge base',
    'collaborative writing platform',
    'semantic search',
    'document management system'
  ],
  openGraph: {
    title: 'Docmet - The Modern Alternative to Confluence',
    description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Docmet - Modern Knowledge Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docmet - The Modern Alternative to Confluence',
    description: 'Replace Confluence with a modern, AI-powered solution that makes documentation effortless and collaboration seamless.',
    images: ['/og-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <ProblemStatement />
      <SolutionOverview />
      <FeaturesShowcase />
      <PricingTeaser />
      <CallToAction />
    </main>
  )
}

