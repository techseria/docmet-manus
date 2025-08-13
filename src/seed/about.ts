import type { RequiredDataFromCollectionSlug } from 'payload'

export const about: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'about',
  _status: 'published',
  title: 'About Us',
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
                text: 'Building the Future of Knowledge Management',
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
                text: 'We\'re on a mission to transform how teams create, organize, and share knowledge. Born from frustration with existing tools, built with love for modern teams.',
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
      blockType: 'problemStatement',
      title: 'Our Story',
      description: 'Docmet was born out of a simple frustration: why was knowledge management still so painful? We saw teams struggling with complex interfaces, poor search functionality, and outdated collaboration models. We knew there had to be a better way.',
    },
    {
      blockType: 'solutionOverview',
      title: 'Why We Built Docmet',
      description: 'Every feature we build addresses a real pain point we\'ve experienced ourselves.',
      features: [
        { title: 'The Search Problem', description: 'Traditional search wasn\'t smart enough.' },
        { title: 'The Collaboration Gap', description: 'Real-time collaboration felt like an afterthought.' },
        { title: 'The AI Opportunity', description: 'AI was transforming everything except knowledge management.' },
      ],
    },
    {
      blockType: 'callToAction',
      title: 'Want to Join Our Mission?',
      description: 'We\'re always looking for passionate people who want to help build the future of knowledge management.',
      button: {
        label: 'View Open Positions',
        url: '/contact',
      },
    },
  ],
  meta: {
    title: 'About Us - Building the Future of Knowledge Management',
    description: 'Learn about Docmet\'s mission, our story, and the team behind the modern knowledge management solution.',
  },
}


