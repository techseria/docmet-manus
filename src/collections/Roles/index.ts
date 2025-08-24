import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'level', 'isActive'],
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
        description: 'Role name (e.g., Admin, Editor, Contributor)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly role identifier',
      },
    },
    {
      name: 'level',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Permission level (1-10, higher = more permissions)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Role description and responsibilities',
      },
    },
    {
      name: 'permissions',
      type: 'group',
      fields: [
        {
          name: 'collections',
          type: 'group',
          fields: [
            {
              name: 'pages',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Read Only', value: 'read' },
                { label: 'Create & Read', value: 'create' },
                { label: 'Full Access', value: 'full' },
              ],
            },
            {
              name: 'posts',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Read Only', value: 'read' },
                { label: 'Create & Read', value: 'create' },
                { label: 'Full Access', value: 'full' },
              ],
            },
            {
              name: 'media',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Read Only', value: 'read' },
                { label: 'Upload & Read', value: 'create' },
                { label: 'Full Access', value: 'full' },
              ],
            },
            {
              name: 'users',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Read Only', value: 'read' },
                { label: 'Create & Read', value: 'create' },
                { label: 'Full Access', value: 'full' },
              ],
            },
          ],
        },
        {
          name: 'features',
          type: 'group',
          fields: [
            {
              name: 'canPublish',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Can publish content without approval',
              },
            },
            {
              name: 'canApprove',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Can approve content for publication',
              },
            },
            {
              name: 'canManageUsers',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Can create and manage user accounts',
              },
            },
            {
              name: 'canAccessAnalytics',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Can view analytics and reports',
              },
            },
            {
              name: 'canManageSettings',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Can modify system settings',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this role is currently active',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color for role badge (e.g., #3B82F6)',
      },
    },
  ],
  timestamps: true,
}

