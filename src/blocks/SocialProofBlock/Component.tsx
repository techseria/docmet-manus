import React from 'react'
import { Media } from '@/components/Media'

import type { SocialProofBlock as SocialProofBlockProps } from '@/payload-types'

const backgroundClasses = {
  'gray-50': 'bg-gray-50',
  'white': 'bg-white',
  'blue-50': 'bg-blue-50',
}

export const SocialProofBlock: React.FC<SocialProofBlockProps> = ({
  title,
  companies,
  backgroundColor = 'gray-50',
}) => {
  const bgClass = backgroundClasses[backgroundColor || 'gray-50'] || backgroundClasses['gray-50']

  if (!companies || companies.length === 0) {
    return null
  }

  return (
    <section className={`${bgClass} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            {title}
          </p>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => {
            const logoElement = (
              <div key={index} className="flex items-center justify-center h-12">
                <Media
                  resource={company.logo}
                  className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                  alt={company.name}
                />
              </div>
            )

            if (company.url) {
              return (
                <a
                  key={index}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {logoElement}
                </a>
              )
            }

            return logoElement
          })}
        </div>
      </div>
    </section>
  )
}

