import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Features: CollectionConfig = {
  slug: 'features',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Feature title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the feature (2-3 sentences)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Content Management',
          value: 'content-management',
        },
        {
          label: 'AI & Search',
          value: 'ai-search',
        },
        {
          label: 'Security & Permissions',
          value: 'security-permissions',
        },
        {
          label: 'Analytics & Integrations',
          value: 'analytics-integrations',
        },
      ],
      admin: {
        description: 'Feature category for organization',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name (e.g., from Lucide or Heroicons)',
      },
    },
    {
      name: 'capabilities',
      type: 'array',
      fields: [
        {
          name: 'capability',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key capabilities (bullet points)',
      },
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Feature screenshot or mockup',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this feature in featured sections',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'learnMoreUrl',
      type: 'text',
      admin: {
        description: 'URL for "Learn more" link (optional)',
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

