import React from 'react'
import type { Metadata } from 'next'
import { FolderTree, MessageSquare, Users, BarChart3, Shield, Workflow, Archive, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Features - Powerful Knowledge Management Tools',
  description: 'Discover all the powerful features that make Docmet the modern alternative to Confluence. AI-powered search, smart organization, team collaboration, and more.',
  keywords: [
    'knowledge management features',
    'AI search',
    'team collaboration',
    'content management',
    'document organization',
    'workflow automation',
    'analytics dashboard',
    'permission management'
  ],
  openGraph: {
    title: 'Features - Powerful Knowledge Management Tools | Docmet',
    description: 'Discover all the powerful features that make Docmet the modern alternative to Confluence.',
    type: 'website',
  },
}

const featureCategories = [
  {
    title: 'Content Management',
    description: 'Organize and manage your knowledge with intelligent tools',
    features: [
      {
        icon: FolderTree,
        title: 'Space, Folder, Files and Pages',
        description: 'Hierarchical organization system that scales with your team. Create logical structures that everyone can understand and navigate.',
        capabilities: [
          'Nested folder structures',
          'Drag-and-drop organization',
          'Bulk operations',
          'Smart categorization'
        ]
      },
      {
        icon: Workflow,
        title: 'Content Approval Workflow',
        description: 'Streamlined review and approval process ensures quality and compliance across all your documentation.',
        capabilities: [
          'Multi-stage approval',
          'Role-based reviews',
          'Automated notifications',
          'Version control'
        ]
      },
      {
        icon: Archive,
        title: 'Bulk Archive',
        description: 'Efficient content lifecycle management with automated archiving and retention policies.',
        capabilities: [
          'Automated archiving rules',
          'Bulk operations',
          'Retention policies',
          'Easy restoration'
        ]
      }
    ]
  },
  {
    title: 'AI & Search',
    description: 'Find information instantly with AI-powered intelligence',
    features: [
      {
        icon: MessageSquare,
        title: 'AI Chat & Semantic Search',
        description: 'Natural language queries and intelligent results that understand context and intent.',
        capabilities: [
          'Natural language processing',
          'Contextual understanding',
          'Instant results',
          'Smart suggestions'
        ]
      },
      {
        icon: Zap,
        title: 'AI Assistant/Agent',
        description: 'Content creation and editing assistance powered by advanced AI technology.',
        capabilities: [
          'Writing assistance',
          'Content suggestions',
          'Grammar and style checks',
          'Auto-completion'
        ]
      }
    ]
  },
  {
    title: 'Security & Permissions',
    description: 'Enterprise-grade security with granular control',
    features: [
      {
        icon: Users,
        title: 'User, Roles & Permissions',
        description: 'Granular access control that gives you complete control over who can see and edit what.',
        capabilities: [
          'Role-based access',
          'Custom permissions',
          'User groups',
          'Audit trails'
        ]
      },
      {
        icon: Shield,
        title: 'Permission Inheritance',
        description: 'Simplified permission management with intelligent inheritance and override capabilities.',
        capabilities: [
          'Automatic inheritance',
          'Override controls',
          'Bulk permission updates',
          'Visual permission tree'
        ]
      }
    ]
  },
  {
    title: 'Analytics & Integrations',
    description: 'Insights and connections that drive productivity',
    features: [
      {
        icon: BarChart3,
        title: 'Analytics',
        description: 'Usage insights and content performance metrics to optimize your knowledge management strategy.',
        capabilities: [
          'Usage analytics',
          'Content performance',
          'User engagement',
          'Custom reports'
        ]
      },
      {
        icon: Zap,
        title: 'Webhooks Integration',
        description: 'Connect with your existing tools and automate workflows with powerful integration capabilities.',
        capabilities: [
          'Real-time webhooks',
          'API integrations',
          'Workflow automation',
          'Custom connectors'
        ]
      }
    ]
  }
]

export default function FeaturesPage() {
  return (
    <main className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for{' '}
            <span className="text-blue-600">Modern Knowledge Management</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, organize, and share knowledge across your organization. 
            Built for teams that demand more from their documentation platform.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {category.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {category.features.map((feature, featureIndex) => {
                const IconComponent = feature.icon
                return (
                  <div key={featureIndex} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{capability}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Start your free trial today and see how Docmet can transform your team's knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

