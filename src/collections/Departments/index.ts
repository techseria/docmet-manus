import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Departments: CollectionConfig = {
  slug: 'departments',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'manager', 'memberCount'],
    useAsTitle: 'name',
    group: 'User Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Department name (e.g., Marketing, Sales, Content)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly department identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Department description and responsibilities',
      },
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Department manager/lead',
      },
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        description: 'Department members',
      },
    },
    {
      name: 'budget',
      type: 'number',
      admin: {
        description: 'Department budget (optional)',
      },
    },
    {
      name: 'goals',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'targetDate',
          type: 'date',
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'planning',
          options: [
            { label: 'Planning', value: 'planning' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'On Hold', value: 'on-hold' },
          ],
        },
      ],
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color for department badge (e.g., #10B981)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this department is currently active',
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Add computed field for member count
        if (doc.members) {
          doc.memberCount = Array.isArray(doc.members) ? doc.members.length : 0
        }
        return doc
      },
    ],
  },
  timestamps: true,
}

