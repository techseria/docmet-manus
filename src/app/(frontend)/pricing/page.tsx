import React from 'react'
import type { Metadata } from 'next'
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Pricing - Simple, Transparent Plans',
  description: 'Choose the perfect plan for your team. Start free, scale as you grow. No hidden fees, no surprises. Compare our Starter, Professional, and Enterprise plans.',
  keywords: [
    'docmet pricing',
    'knowledge management pricing',
    'confluence alternative pricing',
    'team documentation cost',
    'enterprise knowledge base pricing',
    'free documentation tool',
    'affordable team wiki'
  ],
  openGraph: {
    title: 'Pricing - Simple, Transparent Plans | Docmet',
    description: 'Choose the perfect plan for your team. Start free, scale as you grow.',
    type: 'website',
  },
}

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 10 users',
      'Basic spaces and pages',
      'Standard search',
      'Community support',
      'Core features included',
      '5GB storage',
      'Basic templates'
    ],
    notIncluded: [
      'AI features',
      'Advanced analytics',
      'Priority support',
      'Approval workflows',
      'Advanced permissions',
      'Custom integrations',
      'SSO'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Professional',
    price: '$8',
    period: '/user/month',
    description: 'For growing teams that need more power',
    features: [
      'Unlimited users',
      'All AI features',
      'Advanced analytics',
      'Priority support',
      'Approval workflows',
      'Advanced permissions',
      'Unlimited storage',
      'Custom templates',
      'API access',
      'Webhooks',
      'Advanced search',
      'Version history'
    ],
    notIncluded: [
      'Custom integrations',
      'SSO & advanced security',
      'Dedicated success manager',
      'SLA guarantees',
      'On-premise deployment'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Professional',
      'Custom integrations',
      'SSO & advanced security',
      'Dedicated success manager',
      'SLA guarantees',
      'On-premise option',
      'Custom training',
      'Advanced compliance',
      'Audit logs',
      'Custom branding',
      'Priority feature requests',
      'Phone support'
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false
  }
]

const faqs = [
  {
    question: 'Can I change plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'You can export all your data at any time. After cancellation, we keep your data for 30 days to allow for reactivation, then it\'s permanently deleted.'
  },
  {
    question: 'Do you offer annual discounts?',
    answer: 'Yes! Save 20% when you pay annually. The discount is automatically applied when you choose annual billing.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees, ever. You only pay for your chosen plan, and you can start using Docmet immediately.'
  },
  {
    question: 'Can I try Enterprise features?',
    answer: 'Yes, we offer extended trials for Enterprise features. Contact our sales team to discuss your specific needs.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.'
  }
]

export default function PricingPage() {
  return (
    <main className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, <span className="text-blue-600">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your team size and needs. No hidden fees, no surprises. 
            Start free and scale as you grow.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-opacity-20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                    {plan.period && (
                      <span className={`text-lg font-normal ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className={`h-5 w-5 mr-3 ${plan.popular ? 'text-green-400' : 'text-green-500'}`} />
                      <span className={`${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center opacity-50">
                      <X className={`h-5 w-5 mr-3 ${plan.popular ? 'text-white' : 'text-gray-400'}`} />
                      <span className={`${plan.popular ? 'text-white' : 'text-gray-500'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8">
              <strong>20% off</strong> with annual billing • <strong>No hidden fees</strong> • Cancel anytime
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">No Setup Fees</h4>
                <p className="text-gray-600 text-sm">Get started immediately with no upfront costs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Data Export</h4>
                <p className="text-gray-600 text-sm">Your data is always yours to export</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Get help when you need it most</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teams who have already made the switch to smarter knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

