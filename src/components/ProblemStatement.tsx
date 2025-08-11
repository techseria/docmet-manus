'use client'

import React from 'react'
import { Navigation, Search, DollarSign, Clock } from 'lucide-react'

export const ProblemStatement: React.FC = () => {
  const painPoints = [
    {
      icon: Navigation,
      title: 'Complex Navigation',
      description: 'Poor user experience that slows down productivity'
    },
    {
      icon: Search,
      title: 'Limited AI Capabilities',
      description: 'Outdated search functionality that fails to find what you need'
    },
    {
      icon: DollarSign,
      title: 'Expensive Licensing',
      description: 'Costly per-user pricing that doesn\'t scale with growing teams'
    },
    {
      icon: Clock,
      title: 'Outdated Interface',
      description: 'Legacy design that hinders modern collaboration workflows'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Teams Are Moving Away From Confluence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional knowledge management tools weren't built for modern teams. 
            Here's what's holding your team back.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {painPoints.map((point, index) => {
            const IconComponent = point.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

