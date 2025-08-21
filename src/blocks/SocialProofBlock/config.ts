import type { Block } from 'payload'

export const SocialProofBlock: Block = {
  slug: 'socialProofBlock',
  interfaceName: 'SocialProofBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Trusted by teams at',
      admin: {
        description: 'Title text above company logos',
      },
    },
    {
      name: 'companies',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Company name for alt text',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Company logo image',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Optional link to company website',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'gray-50',
      options: [
        {
          label: 'Light Gray',
          value: 'gray-50',
        },
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Blue Light',
          value: 'blue-50',
        },
      ],
    },
  ],
}

