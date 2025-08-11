'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FolderTree, MessageSquare, Users, BarChart3 } from 'lucide-react'

export const FeaturesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      icon: FolderTree,
      title: 'Smart Organization',
      description: 'Hierarchical spaces, folders, and pages with AI-powered content suggestions',
      screenshot: 'Content Management Dashboard'
    },
    {
      icon: MessageSquare,
      title: 'AI Chat & Search',
      description: 'Natural language queries that understand context and find exactly what you need',
      screenshot: 'AI Search Interface'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Real-time editing, approval workflows, and granular permission management',
      screenshot: 'Collaboration Tools'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track content performance, user engagement, and knowledge gaps',
      screenshot: 'Analytics Dashboard'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Knowledge Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, organize, and share knowledge across your organization.
          </p>
        </div>
        
        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-2" />
                {feature.title}
              </button>
            )
          })}
        </div>
        
        {/* Active Feature Display */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="flex items-center mb-6">
                {React.createElement(features[activeTab].icon, {
                  className: "h-8 w-8 text-blue-600 mr-3"
                })}
                <h3 className="text-2xl font-bold text-gray-900">
                  {features[activeTab].title}
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                {features[activeTab].description}
              </p>
              
              {/* Feature Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Intuitive interface designed for productivity</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">AI-powered suggestions and automation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Enterprise-grade security and compliance</span>
                </div>
              </div>
              
              <Button variant="outline">
                Learn More About This Feature
              </Button>
            </div>
            
            {/* Screenshot/Mockup */}
            <div className="bg-gray-100 p-8 lg:p-12 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    {React.createElement(features[activeTab].icon, {
                      className: "h-12 w-12 text-blue-600 mx-auto mb-2"
                    })}
                    <p className="text-gray-600 font-medium">
                      {features[activeTab].screenshot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

