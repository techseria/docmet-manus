'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { Media } from '@/components/Media'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

const backgroundClasses = {
  'gradient-blue': 'bg-gradient-to-br from-blue-50 to-white',
  'gradient-purple': 'bg-gradient-to-br from-purple-50 to-white',
  'gradient-green': 'bg-gradient-to-br from-green-50 to-white',
  'white': 'bg-white',
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  highlightText,
  subtitle,
  primaryCTA,
  secondaryCTA,
  disclaimer,
  heroImage,
  backgroundColor = 'gradient-blue',
}) => {
  const bgClass = backgroundClasses[backgroundColor || 'gradient-blue'] || backgroundClasses['gradient-blue']

  return (
    <section className={`relative ${bgClass} py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {title}
            {highlightText && (
              <> <span className="text-blue-600">{highlightText}</span></>
            )}
          </h1>
          
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCTA && (
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <a href={primaryCTA.url}>
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            )}
            
            {secondaryCTA && (
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <a href={secondaryCTA.url}>
                  <Play className="mr-2 h-5 w-5" />
                  {secondaryCTA.text}
                </a>
              </Button>
            )}
          </div>
          
          {disclaimer && (
            <p className="text-sm text-gray-500 mt-4">{disclaimer}</p>
          )}
        </div>
        
        {/* Hero Image */}
        {heroImage && (
          <div className="mt-16 relative">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
              <Media resource={heroImage} className="rounded-lg" />
            </div>
          </div>
        )}
        
        {/* Fallback placeholder if no image */}
        {!heroImage && (
          <div className="mt-16 relative">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">D</span>
                  </div>
                  <p className="text-gray-600">Dashboard Mockup</p>
                  <p className="text-sm text-gray-500">Upload hero image in CMS</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

