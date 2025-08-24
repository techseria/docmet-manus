import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'department', 'isActive'],
    useAsTitle: 'name',
    group: 'User Management',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'First name for personalization',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        description: 'Last name for formal communications',
      },
    },
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'roles',
      required: true,
      admin: {
        description: 'User role determining permissions',
      },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: {
        description: 'Department/team assignment',
      },
    },
    {
      name: 'profile',
      type: 'group',
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Profile picture',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          admin: {
            description: 'Short biography or description',
          },
        },
        {
          name: 'jobTitle',
          type: 'text',
          admin: {
            description: 'Job title or position',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone number',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Office location or timezone',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'Website', value: 'website' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        {
          name: 'timezone',
          type: 'select',
          defaultValue: 'UTC',
          options: [
            { label: 'UTC', value: 'UTC' },
            { label: 'EST (Eastern)', value: 'America/New_York' },
            { label: 'PST (Pacific)', value: 'America/Los_Angeles' },
            { label: 'GMT (London)', value: 'Europe/London' },
            { label: 'CET (Central Europe)', value: 'Europe/Paris' },
          ],
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'en',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'German', value: 'de' },
          ],
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Receive email notifications',
          },
        },
        {
          name: 'darkMode',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Use dark mode interface',
          },
        },
      ],
    },
    {
      name: 'security',
      type: 'group',
      fields: [
        {
          name: 'twoFactorEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Two-factor authentication enabled',
          },
        },
        {
          name: 'lastLogin',
          type: 'date',
          admin: {
            readOnly: true,
            description: 'Last login timestamp',
          },
        },
        {
          name: 'loginAttempts',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Failed login attempts',
          },
        },
        {
          name: 'isLocked',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Account locked due to security',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this user account is active',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this user (admin only)',
      },
    },
  ],
  timestamps: true,
}
