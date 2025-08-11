import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyStory',
      type: 'richText',
      label: 'Company Story',
      admin: {
        description: 'The founding story and mission of the company.',
      },
    },
    {
      name: 'teamPhotos',
      type: 'array',
      label: 'Team Photos and Bios',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Bio',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
      ],
    },
    {
      name: 'companyValues',
      type: 'richText',
      label: 'Company Values and Culture',
    },
    {
      name: 'whyWeBuiltDocmet',
      type: 'richText',
      label: 'Why We Built Docmet',
      admin: {
        description: 'Personal pain points with existing solutions, vision for better collaboration, and commitment to user experience.',
      },
    },
    {
      name: 'companyStats',
      type: 'array',
      label: 'Company Stats',
      fields: [
        {
          name: 'statLabel',
          type: 'text',
          label: 'Statistic Label (e.g., Founded Year)',
          required: true,
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Statistic Value (e.g., 2023, 50+)',
          required: true,
        },
      ],
    },
  ],
}


