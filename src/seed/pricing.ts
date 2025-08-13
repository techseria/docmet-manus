import type { RequiredDataFromCollectionSlug } from 'payload'

export const pricing: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'pricing',
  _status: 'published',
  title: 'Pricing',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Simple, Transparent Pricing',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Choose the plan that fits your team size and needs. No hidden fees, no surprises. Start free and scale as you grow.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockType: 'pricingTeaser',
      title: 'Our Plans',
      description: 'Find the perfect plan for your team.',
      callToAction: {
        label: 'Contact Sales',
        url: '/contact',
      },
    },
    {
      blockType: 'callToAction',
      title: 'Ready to Get Started?',
      description: 'Join thousands of teams who have already made the switch to smarter knowledge management.',
      button: {
        label: 'Start Your Free Trial',
        url: '/contact',
      },
    },
  ],
  meta: {
    title: 'Docmet Pricing - Simple, Transparent Plans',
    description: 'Explore Docmet\'s simple and transparent pricing plans. Choose the best fit for your team\'s knowledge management needs.',
  },
}


