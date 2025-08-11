'use client'

import React from 'react'

export const SocialProof: React.FC = () => {
  const companies = [
    'TechFlow', 'GrowthCorp', 'InnovateLabs', 'DataSync', 'CloudFirst',
    'DevOps Pro', 'ScaleUp', 'NextGen Solutions'
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Trusted by <span className="font-semibold text-blue-600">500+ companies</span> worldwide
          </p>
          
          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="bg-gray-100 rounded-lg p-4 w-full h-16 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">{company}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Customer Testimonial */}
          <div className="mt-16 max-w-4xl mx-auto">
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "Docmet transformed how our engineering team shares knowledge. The AI search finds exactly what we need, 
              and the interface actually makes sense."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">SC</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Sarah Chen</p>
                <p className="text-gray-600">Engineering Manager at TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

