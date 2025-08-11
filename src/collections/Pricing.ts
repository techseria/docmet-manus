import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'type', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the pricing plan (e.g., Starter, Professional, Enterprise)',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Free',
          value: 'free',
        },
        {
          label: 'Per User',
          value: 'per-user',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      defaultValue: 'per-user',
      required: true,
      admin: {
        description: 'Type of pricing plan',
      },
    },
    {
      name: 'pricePerUserPerMonth',
      type: 'number',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'per-user',
        description: 'Price per user per month (e.g., 8 for $8/user/month)',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key features included in this plan (bullet points)',
      },
    },
    {
      name: 'mostPopular',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this plan as \'Most Popular\'',
      },
    },
    {
      name: 'annualDiscountText',
      type: 'text',
      admin: {
        description: 'Text for annual discount mention (e.g., \'20% off with annual billing\')',
      },
    },
    {
      name: 'noHiddenFeesGuarantee',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Indicate \'No hidden fees\' guarantee',
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

