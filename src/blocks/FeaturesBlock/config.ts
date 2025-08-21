import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'featuresBlock',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Features that make the difference',
      admin: {
        description: 'Main title for the features section',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional subtitle or description',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
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
            description: 'Feature description',
          },
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Search', value: 'search' },
            { label: 'Users', value: 'users' },
            { label: 'Lock', value: 'lock' },
            { label: 'Zap', value: 'zap' },
            { label: 'Globe', value: 'globe' },
            { label: 'Shield', value: 'shield' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Database', value: 'database' },
            { label: 'Cloud', value: 'cloud' },
            { label: 'Settings', value: 'settings' },
            { label: 'Star', value: 'star' },
            { label: 'Heart', value: 'heart' },
          ],
          admin: {
            description: 'Icon to display with the feature',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Highlight this feature with special styling',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid-3',
      options: [
        {
          label: '2 Columns',
          value: 'grid-2',
        },
        {
          label: '3 Columns',
          value: 'grid-3',
        },
        {
          label: '4 Columns',
          value: 'grid-4',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Light Gray',
          value: 'gray-50',
        },
        {
          label: 'Blue Light',
          value: 'blue-50',
        },
      ],
    },
  ],
}

