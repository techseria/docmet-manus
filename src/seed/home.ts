import type { RequiredDataFromCollectionSlug } from 'payload'
import { heroImage } from './media'

export const home: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Home',
  hero: {
    type: 'highImpact',
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
                text: 'Your Modern Knowledge Management Solution',
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
                text: 'Docmet helps teams create, organize, and share knowledge seamlessly. Say goodbye to scattered information and hello to a centralized, intelligent workspace.',
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
    links: [
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Get Started Free',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          url: '/features',
          label: 'Learn More',
          newTab: false,
        },
      },
    ],
    media: heroImage,
  },
  layout: [
    {
      blockType: 'socialProof',
      logos: [
        { logo: 'https://via.placeholder.com/150x50?text=Company+A' },
        { logo: 'https://via.placeholder.com/150x50?text=Company+B' },
        { logo: 'https://via.placeholder.com/150x50?text=Company+C' },
      ],
    },
    {
      blockType: 'problemStatement',
      title: 'The Problem with Traditional Knowledge Management',
      description: 'Existing tools are often clunky, hard to navigate, and lead to information silos. Teams struggle to find what they need, leading to wasted time and decreased productivity.',
    },
    {
      blockType: 'solutionOverview',
      title: 'Docmet: The Smarter Way to Work',
      description: 'Docmet provides an intuitive, AI-powered platform that centralizes your team\'s knowledge, making it easy to create, share, and discover information.',
      features: [
        { title: 'Intuitive Interface', description: 'Easy to use and navigate, reducing the learning curve.' },
        { title: 'AI-Powered Search', description: 'Find information instantly with intelligent search capabilities.' },
        { title: 'Real-time Collaboration', description: 'Work together on documents in real-time, no matter where you are.' },
      ],
    },
    {
      blockType: 'featuresShowcase',
      title: 'Explore Docmet\'s Powerful Features',
      features: [
        {
          title: 'Dynamic Pages',
          description: 'Create rich, interactive pages with multimedia and custom layouts.',
          image: 'https://via.placeholder.com/600x400?text=Dynamic+Pages',
        },
        {
          title: 'Advanced Search',
          description: 'Leverage AI to find exactly what you need, even in large knowledge bases.',
          image: 'https://via.placeholder.com/600x400?text=Advanced+Search',
        },
        {
          title: 'Collaborative Workspaces',
          description: 'Dedicated spaces for teams to organize projects and share knowledge.',
          image: 'https://via.placeholder.com/600x400?text=Collaborative+Workspaces',
        },
      ],
    },
    {
      blockType: 'pricingTeaser',
      title: 'Simple, Transparent Pricing',
      description: 'Choose the plan that fits your team size and needs. No hidden fees, no surprises.',
      callToAction: {
        label: 'View All Plans',
        url: '/pricing',
      },
    },
    {
      blockType: 'callToAction',
      title: 'Ready to Transform Your Knowledge Management?',
      description: 'Join thousands of teams who have already made the switch to smarter knowledge management.',
      button: {
        label: 'Start Your Free Trial',
        url: '/contact',
      },
    },
  ],
  meta: {
    title: 'Docmet - Modern Knowledge Management',
    description: 'Docmet is your modern knowledge management solution. Create, organize, and share knowledge seamlessly with AI-powered search and real-time collaboration.',
  },
}


