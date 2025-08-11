import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'company', 'featured', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the person giving the testimonial',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title of the person',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'Company name',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile photo of the person (optional)',
      },
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo (optional)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this testimonial in featured sections',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Rating out of 5 stars (optional)',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedAt) {
          data.publishedAt = new Date()
        }
        return data
      },
    ],
  },
}

