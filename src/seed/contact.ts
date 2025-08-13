import type { RequiredDataFromCollectionSlug } from 'payload'

export const contact: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'contact',
  _status: 'published',
  title: 'Contact Us',
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
                text: 'Get in Touch',
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
                text: 'Have questions about Docmet? Need help getting started? Our team is here to help you succeed.',
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
      blockType: 'callToAction',
      title: 'Send Us a Message',
      description: 'Fill out the form below and we\'ll get back to you within 24 hours.',
      button: {
        label: 'Contact Sales',
        url: '/contact',
      },
    },
  ],
  meta: {
    title: 'Contact Us - Get in Touch with Docmet',
    description: 'Contact Docmet for sales inquiries, support, or general questions. Our team is ready to assist you.',
  },
}


