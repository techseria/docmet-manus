import React from 'react'
import { 
  Search, Users, Lock, Zap, Globe, Shield, 
  Smartphone, Database, Cloud, Settings, Star, Heart 
} from 'lucide-react'

import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

const iconMap = {
  search: Search,
  users: Users,
  lock: Lock,
  zap: Zap,
  globe: Globe,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  settings: Settings,
  star: Star,
  heart: Heart,
}

const backgroundClasses = {
  'white': 'bg-white',
  'gray-50': 'bg-gray-50',
  'blue-50': 'bg-blue-50',
}

const gridClasses = {
  'grid-2': 'md:grid-cols-2',
  'grid-3': 'md:grid-cols-3',
  'grid-4': 'md:grid-cols-2 lg:grid-cols-4',
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title,
  subtitle,
  features,
  layout = 'grid-3',
  backgroundColor = 'white',
}) => {
  const bgClass = backgroundClasses[backgroundColor || 'white'] || backgroundClasses['white']
  const gridClass = gridClasses[layout || 'grid-3'] || gridClasses['grid-3']

  if (!features || features.length === 0) {
    return null
  }

  return (
    <section className={`${bgClass} py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-lg transition-all duration-200 hover:shadow-lg ${
                  feature.highlight 
                    ? 'bg-blue-50 border-2 border-blue-200 transform hover:scale-105' 
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                  feature.highlight ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  {IconComponent && (
                    <IconComponent 
                      className={`h-6 w-6 ${
                        feature.highlight ? 'text-white' : 'text-gray-600'
                      }`} 
                    />
                  )}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  feature.highlight ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm ${
                  feature.highlight ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

