import React from 'react'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageSquare, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Docmet',
  description: 'Contact Docmet for sales inquiries, support, or general questions. Multiple ways to reach our team including live chat, email, and phone support.',
  keywords: [
    'contact docmet',
    'docmet support',
    'sales inquiries',
    'customer support',
    'help center',
    'get in touch'
  ],
  openGraph: {
    title: 'Contact Us - Get in Touch with Docmet',
    description: 'Contact Docmet for sales inquiries, support, or general questions.',
    type: 'website',
  },
}

const contactOptions = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    details: 'Available 24/7',
    action: 'Start Chat',
    primary: true
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    details: 'support@docmet.com',
    action: 'Send Email',
    primary: false
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our team',
    details: '+1 (555) 123-4567',
    action: 'Call Now',
    primary: false
  },
  {
    icon: Users,
    title: 'Sales Team',
    description: 'Discuss enterprise solutions',
    details: 'sales@docmet.com',
    action: 'Contact Sales',
    primary: false
  }
]

const supportResources = [
  {
    icon: MessageSquare,
    title: 'Help Center',
    description: 'Browse our comprehensive documentation and guides',
    link: '/help'
  },
  {
    icon: Clock,
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials to get the most out of Docmet',
    link: '/tutorials'
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with other users and share best practices',
    link: '/community'
  },
  {
    icon: MapPin,
    title: 'Webinars',
    description: 'Join live sessions to learn advanced features',
    link: '/webinars'
  }
]

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about Docmet? Need help getting started? Our team is here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose How You'd Like to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer multiple ways to get in touch, so you can choose what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-6 text-center ${
                    option.primary
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 hover:shadow-lg transition-shadow'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                    option.primary ? 'bg-white bg-opacity-20' : 'bg-blue-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      option.primary ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    option.primary ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option.title}
                  </h3>
                  <p className={`mb-3 ${
                    option.primary ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                  <p className={`text-sm mb-4 ${
                    option.primary ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {option.details}
                  </p>
                  <Button
                    className={option.primary
                      ? 'bg-white text-blue-600 hover:bg-gray-100 w-full'
                      : 'w-full'
                    }
                    variant={option.primary ? 'default' : 'outline'}
                  >
                    {option.action}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                  I'd like to receive updates about Docmet features and best practices
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Self-Service Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking for quick answers? Check out these helpful resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visit Our Office
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">San Francisco Headquarters</h3>
                    <p className="text-gray-600">
                      123 Innovation Drive<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 lg:h-auto flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

