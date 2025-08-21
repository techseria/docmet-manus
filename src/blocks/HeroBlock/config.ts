import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline for the hero section',
      },
    },
    {
      name: 'highlightText',
      type: 'text',
      admin: {
        description: 'Text to highlight in a different color (optional)',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Subtitle or description text',
      },
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Start Free Trial',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/signup',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Watch Demo',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/demo',
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'text',
      defaultValue: 'No credit card required',
      admin: {
        description: 'Small disclaimer text below CTAs',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero section image or mockup',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'gradient-blue',
      options: [
        {
          label: 'Blue Gradient',
          value: 'gradient-blue',
        },
        {
          label: 'Purple Gradient',
          value: 'gradient-purple',
        },
        {
          label: 'Green Gradient',
          value: 'gradient-green',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
    },
  ],
}

