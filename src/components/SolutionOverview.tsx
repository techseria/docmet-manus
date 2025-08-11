'use client'

import React from 'react'
import { Brain, Zap, DollarSign, Shield } from 'lucide-react'

export const SolutionOverview: React.FC = () => {
  const differentiators = [
    {
      icon: Brain,
      title: 'AI-First Approach',
      description: 'Intelligent content creation and semantic search that understands context'
    },
    {
      icon: Zap,
      title: 'Intuitive Interface',
      description: 'Modern design built for productivity, not complexity'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'Simple, scalable pricing that grows with your team'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Advanced permissions and security features you can trust'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet <span className="text-blue-600">Docmet</span>: Built for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you loved about traditional knowledge management, 
            reimagined for the way teams work today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            )
          })}
        </div>
        
        {/* Visual representation */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The difference is in the details
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">10x faster search with AI-powered semantic understanding</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Collaborative editing with real-time suggestions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Automated content organization and tagging</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Enterprise-grade security with granular permissions</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-gray-600 text-sm">AI-Powered Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

