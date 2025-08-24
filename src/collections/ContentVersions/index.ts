import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { editorAccess } from '../../access/rbac'

export const ContentVersions: CollectionConfig = {
  slug: 'content-versions',
  access: {
    admin: authenticated,
    create: editorAccess,
    delete: authenticated,
    read: authenticated,
    update: editorAccess,
  },
  admin: {
    defaultColumns: ['title', 'contentType', 'version', 'author', 'createdAt'],
    useAsTitle: 'title',
    group: 'Content Management',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Version title or description',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Blog Post', value: 'post' },
        { label: 'Media Asset', value: 'media' },
        { label: 'Product', value: 'product' },
      ],
    },
    {
      name: 'contentId',
      type: 'text',
      required: true,
      admin: {
        description: 'ID of the original content item',
      },
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      admin: {
        description: 'Version number (e.g., 1.0, 1.1, 2.0)',
      },
    },
    {
      name: 'versionType',
      type: 'select',
      defaultValue: 'minor',
      options: [
        { label: '🔴 Major', value: 'major' },
        { label: '🟡 Minor', value: 'minor' },
        { label: '🟢 Patch', value: 'patch' },
        { label: '🔵 Draft', value: 'draft' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'User who created this version',
      },
    },
    {
      name: 'parentVersion',
      type: 'relationship',
      relationTo: 'content-versions',
      admin: {
        description: 'Previous version this is based on',
      },
    },
    {
      name: 'contentSnapshot',
      type: 'json',
      admin: {
        description: 'Complete snapshot of content at this version',
      },
    },
    {
      name: 'changes',
      type: 'array',
      fields: [
        {
          name: 'field',
          type: 'text',
          required: true,
          admin: {
            description: 'Field that was changed',
          },
        },
        {
          name: 'changeType',
          type: 'select',
          options: [
            { label: '➕ Added', value: 'added' },
            { label: '✏️ Modified', value: 'modified' },
            { label: '🗑️ Deleted', value: 'deleted' },
          ],
        },
        {
          name: 'oldValue',
          type: 'textarea',
          admin: {
            description: 'Previous value',
          },
        },
        {
          name: 'newValue',
          type: 'textarea',
          admin: {
            description: 'New value',
          },
        },
      ],
    },
    {
      name: 'changeLog',
      type: 'textarea',
      admin: {
        description: 'Summary of changes made in this version',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: '📝 Draft', value: 'draft' },
        { label: '👀 Review', value: 'review' },
        { label: '✅ Approved', value: 'approved' },
        { label: '🚀 Published', value: 'published' },
        { label: '🗃️ Archived', value: 'archived' },
      ],
    },
    {
      name: 'isCurrentVersion',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this is the current active version',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When this version was published',
      },
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        {
          name: 'wordCount',
          type: 'number',
        },
        {
          name: 'characterCount',
          type: 'number',
        },
        {
          name: 'imageCount',
          type: 'number',
        },
        {
          name: 'linkCount',
          type: 'number',
        },
      ],
    },
    {
      name: 'rollbackData',
      type: 'group',
      fields: [
        {
          name: 'canRollback',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Whether this version can be rolled back to',
          },
        },
        {
          name: 'rollbackReason',
          type: 'textarea',
          admin: {
            description: 'Reason for rollback (if applicable)',
          },
        },
        {
          name: 'rolledBackBy',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'User who performed the rollback',
          },
        },
        {
          name: 'rolledBackAt',
          type: 'date',
          admin: {
            description: 'When rollback was performed',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate version number if not provided
        if (operation === 'create' && !data.version) {
          // Logic to generate next version number
          // This would query existing versions and increment
          data.version = '1.0'
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Update current version flag
        if (doc.isCurrentVersion) {
          // Set all other versions of this content to not current
          await req.payload.update({
            collection: 'content-versions',
            where: {
              and: [
                { contentId: { equals: doc.contentId } },
                { id: { not_equals: doc.id } },
              ],
            },
            data: {
              isCurrentVersion: false,
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}

