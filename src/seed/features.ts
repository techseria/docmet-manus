import type { RequiredDataFromCollectionSlug } from 'payload'

export const features: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'features',
  _status: 'published',
  title: 'Features',
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
                text: 'Powerful Features for Seamless Collaboration',
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
                text: 'Docmet offers a comprehensive suite of tools designed to enhance your team\'s productivity and knowledge sharing.',
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
      blockType: 'featuresShowcase',
      title: 'Core Features',
      features: [
        {
          title: 'Dynamic Page Creation',
          description: 'Create rich, interactive pages with ease using our intuitive editor. Embed multimedia, code snippets, and more.',
          image: 'https://via.placeholder.com/600x400?text=Dynamic+Pages',
        },
        {
          title: 'Advanced Search & Discovery',
          description: 'Find information instantly with AI-powered search. Our intelligent algorithms understand context and deliver precise results.',
          image: 'https://via.placeholder.com/600x400?text=Advanced+Search',
        },
        {
          title: 'Real-time Collaboration',
          description: 'Work together on documents in real-time, see changes as they happen, and leave comments for seamless teamwork.',
          image: 'https://via.placeholder.com/600x400?text=Real-time+Collaboration',
        },
        {
          title: 'Version History & Rollback',
          description: 'Never lose a change. Track every revision, compare versions, and revert to previous states with a single click.',
          image: 'https://via.placeholder.com/600x400?text=Version+History',
        },
        {
          title: 'Customizable Workspaces',
          description: 'Tailor your workspace to fit your team\'s unique needs. Organize content with custom categories, tags, and permissions.',
          image: 'https://via.placeholder.com/600x400?text=Customizable+Workspaces',
        },
        {
          title: 'Integrations & APIs',
          description: 'Connect Docmet with your favorite tools. Our robust API allows for seamless integration with your existing workflows.',
          image: 'https://via.placeholder.com/600x400?text=Integrations',
        },
      ],
    },
    {
      blockType: 'callToAction',
      title: 'Ready to Explore All Features?',
      description: 'Dive deeper into how Docmet can transform your team\'s knowledge management.',
      button: {
        label: 'Get Started Free',
        url: '/contact',
      },
    },
  ],
  meta: {
    title: 'Docmet Features - Powerful Knowledge Management Tools',
    description: 'Explore the powerful features of Docmet, including dynamic page creation, advanced search, real-time collaboration, and customizable workspaces.',
  },
}


