import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { approveAccess, editorAccess } from '../../access/rbac'

export const ContentWorkflow: CollectionConfig = {
  slug: 'content-workflow',
  access: {
    admin: authenticated,
    create: editorAccess,
    delete: approveAccess,
    read: authenticated,
    update: editorAccess,
  },
  admin: {
    defaultColumns: ['title', 'contentType', 'status', 'assignedTo', 'dueDate'],
    useAsTitle: 'title',
    group: 'Content Management',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Workflow title or content name',
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
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'contentId',
      type: 'text',
      admin: {
        description: 'ID of the content item being managed',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: '📝 Draft', value: 'draft' },
        { label: '👀 In Review', value: 'in-review' },
        { label: '🔄 Needs Changes', value: 'needs-changes' },
        { label: '✅ Approved', value: 'approved' },
        { label: '🚀 Published', value: 'published' },
        { label: '📅 Scheduled', value: 'scheduled' },
        { label: '🗃️ Archived', value: 'archived' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: '🔴 High', value: 'high' },
        { label: '🟡 Medium', value: 'medium' },
        { label: '🟢 Low', value: 'low' },
      ],
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User responsible for this workflow item',
      },
    },
    {
      name: 'reviewer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User assigned to review this content',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Original content author',
      },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: {
        description: 'Department responsible for this content',
      },
    },
    {
      name: 'dates',
      type: 'group',
      fields: [
        {
          name: 'dueDate',
          type: 'date',
          admin: {
            description: 'When this workflow item is due',
          },
        },
        {
          name: 'publishDate',
          type: 'date',
          admin: {
            description: 'Scheduled publication date',
          },
        },
        {
          name: 'reviewDate',
          type: 'date',
          admin: {
            description: 'When review was completed',
          },
        },
        {
          name: 'approvalDate',
          type: 'date',
          admin: {
            description: 'When content was approved',
          },
        },
      ],
    },
    {
      name: 'comments',
      type: 'array',
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'comment',
          options: [
            { label: '💬 Comment', value: 'comment' },
            { label: '🔄 Change Request', value: 'change-request' },
            { label: '✅ Approval', value: 'approval' },
            { label: '❌ Rejection', value: 'rejection' },
          ],
        },
        {
          name: 'isInternal',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Internal comment (not visible to author)',
          },
        },
        {
          name: 'timestamp',
          type: 'date',
          defaultValue: () => new Date(),
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'checklist',
      type: 'array',
      admin: {
        description: 'Quality checklist items',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
        {
          name: 'completed',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'completedBy',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'completedAt',
          type: 'date',
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'wordCount',
          type: 'number',
          admin: {
            description: 'Content word count',
          },
        },
        {
          name: 'estimatedReadTime',
          type: 'number',
          admin: {
            description: 'Estimated reading time in minutes',
          },
        },
        {
          name: 'seoScore',
          type: 'number',
          admin: {
            description: 'SEO optimization score (0-100)',
          },
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'notifications',
      type: 'group',
      fields: [
        {
          name: 'emailOnStatusChange',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Send email when status changes',
          },
        },
        {
          name: 'emailOnComment',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Send email when comments are added',
          },
        },
        {
          name: 'slackWebhook',
          type: 'text',
          admin: {
            description: 'Slack webhook URL for notifications',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this workflow is active',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-assign workflow based on content type and department
        if (operation === 'create' && !data.assignedTo) {
          // Logic to auto-assign based on department or content type
          // This would be implemented based on business rules
        }
        
        // Update dates when status changes
        const now = new Date()
        if (data.status === 'in-review' && !data.dates?.reviewDate) {
          data.dates = { ...data.dates, reviewDate: now }
        }
        if (data.status === 'approved' && !data.dates?.approvalDate) {
          data.dates = { ...data.dates, approvalDate: now }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Send notifications when status changes
        if (operation === 'update') {
          // Implementation for sending email/Slack notifications
          // This would integrate with email service and Slack API
        }
      },
    ],
  },
  timestamps: true,
}

