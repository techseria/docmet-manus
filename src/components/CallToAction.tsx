'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'

export const CallToAction: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Team's Documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teams who have already made the switch to smarter knowledge management.
          </p>
          
          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100 px-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <p className="text-blue-100 text-sm mb-8">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
          
          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule a Demo
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Talk to Sales
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-blue-100">Companies Trust Us</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-blue-100">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-100">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

