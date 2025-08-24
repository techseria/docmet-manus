import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const MediaFolders: CollectionConfig = {
  slug: 'media-folders',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'parent', 'mediaCount', 'createdAt'],
    useAsTitle: 'name',
    group: 'Media Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Folder name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly folder identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Folder description',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'media-folders',
      admin: {
        description: 'Parent folder (for nested organization)',
      },
    },
    {
      name: 'color',
      type: 'select',
      defaultValue: 'blue',
      options: [
        { label: '🔵 Blue', value: 'blue' },
        { label: '🟢 Green', value: 'green' },
        { label: '🟡 Yellow', value: 'yellow' },
        { label: '🟠 Orange', value: 'orange' },
        { label: '🔴 Red', value: 'red' },
        { label: '🟣 Purple', value: 'purple' },
        { label: '🟤 Brown', value: 'brown' },
        { label: '⚫ Black', value: 'black' },
        { label: '⚪ White', value: 'white' },
      ],
      admin: {
        description: 'Folder color for visual organization',
      },
    },
    {
      name: 'permissions',
      type: 'group',
      fields: [
        {
          name: 'public',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow public access to media in this folder',
          },
        },
        {
          name: 'allowedRoles',
          type: 'array',
          fields: [
            {
              name: 'role',
              type: 'relationship',
              relationTo: 'roles',
            },
          ],
          admin: {
            description: 'Roles allowed to access this folder',
          },
        },
        {
          name: 'allowedUsers',
          type: 'array',
          fields: [
            {
              name: 'user',
              type: 'relationship',
              relationTo: 'users',
            },
          ],
          admin: {
            description: 'Specific users allowed to access this folder',
          },
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'autoOptimize',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Automatically optimize media uploaded to this folder',
          },
        },
        {
          name: 'compressionLevel',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 80,
          admin: {
            description: 'Default compression level for images (0-100)',
          },
        },
        {
          name: 'allowedFormats',
          type: 'array',
          fields: [
            {
              name: 'format',
              type: 'select',
              options: [
                { label: 'JPEG', value: 'jpeg' },
                { label: 'PNG', value: 'png' },
                { label: 'WebP', value: 'webp' },
                { label: 'AVIF', value: 'avif' },
                { label: 'GIF', value: 'gif' },
                { label: 'SVG', value: 'svg' },
                { label: 'MP4', value: 'mp4' },
                { label: 'WebM', value: 'webm' },
                { label: 'MP3', value: 'mp3' },
                { label: 'WAV', value: 'wav' },
                { label: 'PDF', value: 'pdf' },
              ],
            },
          ],
          admin: {
            description: 'Allowed file formats for this folder',
          },
        },
        {
          name: 'maxFileSize',
          type: 'number',
          admin: {
            description: 'Maximum file size in MB (0 = no limit)',
          },
        },
        {
          name: 'requireApproval',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Require approval before media becomes active',
          },
        },
      ],
    },
    {
      name: 'statistics',
      type: 'group',
      fields: [
        {
          name: 'mediaCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of media files in this folder',
            readOnly: true,
          },
        },
        {
          name: 'totalSize',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Total size of all media in bytes',
            readOnly: true,
          },
        },
        {
          name: 'lastActivity',
          type: 'date',
          admin: {
            description: 'Last time media was added to this folder',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this folder is active',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from name
        if (operation === 'create' && !data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Update parent folder statistics
        if (doc.parent && operation === 'create') {
          try {
            const parentFolder = await req.payload.findByID({
              collection: 'media-folders',
              id: doc.parent,
            })
            
            await req.payload.update({
              collection: 'media-folders',
              id: doc.parent,
              data: {
                statistics: {
                  ...parentFolder.statistics,
                  lastActivity: new Date(),
                },
              },
            })
          } catch (error) {
            console.error('Error updating parent folder statistics:', error)
          }
        }
      },
    ],
  },
  timestamps: true,
}

