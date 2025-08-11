'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Knowledge Management Platform{' '}
            <span className="text-blue-600">Your Team Actually Wants to Use</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Replace Confluence with a modern, AI-powered solution that makes documentation effortless 
            and collaboration seamless
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>
        
        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">D</span>
                </div>
                <p className="text-gray-600">Dashboard Mockup</p>
                <p className="text-sm text-gray-500">Team collaboration scene</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

