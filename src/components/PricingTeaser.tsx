'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

export const PricingTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your team size and needs. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-gray-900">Free</div>
              <p className="text-gray-600 mt-2">Perfect for small teams</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Up to 10 users</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Basic spaces and pages</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Standard search</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Community support</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Get Started Free
            </Button>
          </div>
          
          {/* Professional Plan */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <div className="text-3xl font-bold">
                $8<span className="text-lg font-normal">/user/month</span>
              </div>
              <p className="text-blue-100 mt-2">For growing teams</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                <span>Unlimited users</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                <span>All AI features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                <span>Approval workflows</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900">Custom</div>
              <p className="text-gray-600 mt-2">For large organizations</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Custom integrations</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">SSO & advanced security</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Dedicated success manager</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">SLA guarantees</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            20% off with annual billing • No hidden fees • Cancel anytime
          </p>
          <Button variant="ghost">
            View Full Pricing Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

