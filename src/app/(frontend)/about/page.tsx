import React from 'react'
import type { Metadata } from 'next'
import { Users, Target, Heart, Zap, Globe, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us - Building the Future of Knowledge Management',
  description: 'Learn about Docmet\'s mission to revolutionize knowledge management. Meet our team and discover why we\'re building the modern alternative to Confluence.',
  keywords: [
    'about docmet',
    'knowledge management company',
    'team collaboration',
    'company mission',
    'confluence alternative team',
    'documentation platform founders'
  ],
  openGraph: {
    title: 'About Us - Building the Future of Knowledge Management | Docmet',
    description: 'Learn about Docmet\'s mission to revolutionize knowledge management.',
    type: 'website',
  },
}

const teamMembers = [
  {
    name: 'Sarah Chen',
    title: 'CEO & Co-Founder',
    bio: 'Former VP of Engineering at TechFlow. 15+ years building developer tools and team collaboration platforms.',
    avatar: 'SC'
  },
  {
    name: 'Mike Rodriguez',
    title: 'CTO & Co-Founder',
    bio: 'Ex-Principal Engineer at Google. Expert in AI/ML and distributed systems with a passion for developer experience.',
    avatar: 'MR'
  },
  {
    name: 'Lisa Wang',
    title: 'Head of Product',
    bio: 'Former Product Manager at Atlassian. Deep expertise in knowledge management and enterprise software.',
    avatar: 'LW'
  },
  {
    name: 'David Kim',
    title: 'Head of Design',
    bio: 'Previously Design Lead at Figma. Focused on creating intuitive experiences for complex workflows.',
    avatar: 'DK'
  }
]

const companyValues = [
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Every decision we make starts with understanding our users\' needs and pain points.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We embrace cutting-edge technology to solve old problems in new ways.'
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We build with empathy, understanding the frustrations teams face with existing tools.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We\'re committed to delivering exceptional quality in everything we build.'
  }
]

const companyStats = [
  { label: 'Founded', value: '2023' },
  { label: 'Team Members', value: '25+' },
  { label: 'Customers Served', value: '500+' },
  { label: 'Documents Created', value: '1M+' },
  { label: 'Countries', value: '15+' },
  { label: 'Uptime', value: '99.9%' }
]

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Building the Future of{' '}
              <span className="text-blue-600">Knowledge Management</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform how teams create, organize, and share knowledge. 
              Born from frustration with existing tools, built with love for modern teams.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Docmet was born out of a simple frustration: why was knowledge management still so painful in 2023? 
                  Our founders, having worked at companies like Google, Atlassian, and various startups, experienced 
                  firsthand how existing tools were holding teams back.
                </p>
                <p>
                  We saw teams struggling with complex interfaces, poor search functionality, and outdated collaboration 
                  models. Meanwhile, AI was revolutionizing every other aspect of work. We knew there had to be a better way.
                </p>
                <p>
                  So we set out to build the knowledge management platform we wished we had – one that's intuitive, 
                  intelligent, and built for the way modern teams actually work.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">D</span>
                </div>
                <p className="text-gray-600">Company Journey Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built Docmet */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why We Built Docmet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature we build addresses a real pain point we've experienced ourselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Search Problem</h3>
              <p className="text-gray-600">
                "I know we documented this somewhere..." became the most common phrase in our teams. 
                Traditional search just wasn't smart enough.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Collaboration Gap</h3>
              <p className="text-gray-600">
                Real-time collaboration felt like an afterthought in most tools. We needed something 
                built for how teams actually work together.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The AI Opportunity</h3>
              <p className="text-gray-600">
                AI was transforming everything except knowledge management. We saw the potential 
                to make documentation actually intelligent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse group of builders, thinkers, and problem-solvers united by a shared vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-semibold">{member.avatar}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product decisions to how we treat each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our growth reflects the trust teams place in us to handle their most important knowledge.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to Join Our Mission?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for passionate people who want to help build the future of knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              View Open Positions
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

