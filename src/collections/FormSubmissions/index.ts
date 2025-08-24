import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions-new',
  access: {
    admin: authenticated,
    create: () => true, // Allow public form submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['form', 'submitterEmail', 'status', 'scoring.score', 'createdAt'],
    useAsTitle: 'submitterEmail',
    group: 'Forms & Leads',
  },
  fields: [
    {
      name: 'submitterEmail',
      type: 'email',
      admin: {
        description: 'Submitter email for easy identification',
        readOnly: true,
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'form-builder',
      required: true,
      admin: {
        description: 'Form that was submitted',
      },
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
      admin: {
        description: 'Raw form submission data',
      },
    },
    {
      name: 'submitter',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Submitter email address',
          },
        },
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Submitter name',
          },
        },
        {
          name: 'ipAddress',
          type: 'text',
          admin: {
            description: 'IP address of submitter',
            readOnly: true,
          },
        },
        {
          name: 'userAgent',
          type: 'text',
          admin: {
            description: 'Browser user agent',
            readOnly: true,
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            description: 'Referring page URL',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      admin: {
        description: 'Associated lead record',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👀 Reviewed', value: 'reviewed' },
        { label: '✅ Processed', value: 'processed' },
        { label: '🎯 Converted', value: 'converted' },
        { label: '🗑️ Spam', value: 'spam' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'scoring',
      type: 'group',
      fields: [
        {
          name: 'score',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Calculated lead score',
            readOnly: true,
          },
        },
        {
          name: 'qualified',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Whether this submission qualifies as a lead',
            readOnly: true,
          },
        },
        {
          name: 'scoringDetails',
          type: 'array',
          fields: [
            {
              name: 'rule',
              type: 'text',
              required: true,
            },
            {
              name: 'field',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
            },
            {
              name: 'points',
              type: 'number',
              required: true,
            },
          ],
          admin: {
            description: 'Detailed scoring breakdown',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'processing',
      type: 'group',
      fields: [
        {
          name: 'processed',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Whether this submission has been processed',
            readOnly: true,
          },
        },
        {
          name: 'processedAt',
          type: 'date',
          admin: {
            description: 'When this submission was processed',
            readOnly: true,
          },
        },
        {
          name: 'processedBy',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'User who processed this submission',
            readOnly: true,
          },
        },
        {
          name: 'notifications',
          type: 'group',
          fields: [
            {
              name: 'emailSent',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'emailSentAt',
              type: 'date',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'webhookSent',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'webhookSentAt',
              type: 'date',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'crmSynced',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'crmSyncedAt',
              type: 'date',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
        {
          name: 'errors',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Email Notification', value: 'email' },
                { label: 'Webhook', value: 'webhook' },
                { label: 'CRM Sync', value: 'crm' },
                { label: 'Lead Creation', value: 'lead' },
                { label: 'Validation', value: 'validation' },
              ],
            },
            {
              name: 'message',
              type: 'text',
              required: true,
            },
            {
              name: 'timestamp',
              type: 'date',
              defaultValue: () => new Date(),
            },
            {
              name: 'resolved',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
          admin: {
            description: 'Processing errors',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'spam',
      type: 'group',
      fields: [
        {
          name: 'isSpam',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Marked as spam',
          },
        },
        {
          name: 'spamScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Spam probability score (0-100)',
            readOnly: true,
          },
        },
        {
          name: 'spamReasons',
          type: 'array',
          fields: [
            {
              name: 'reason',
              type: 'select',
              options: [
                { label: 'Honeypot Triggered', value: 'honeypot' },
                { label: 'Suspicious IP', value: 'suspicious_ip' },
                { label: 'Duplicate Submission', value: 'duplicate' },
                { label: 'Invalid Email', value: 'invalid_email' },
                { label: 'Spam Keywords', value: 'spam_keywords' },
                { label: 'Too Fast Submission', value: 'too_fast' },
                { label: 'Bot Detected', value: 'bot_detected' },
              ],
            },
            {
              name: 'details',
              type: 'text',
            },
          ],
          admin: {
            description: 'Reasons for spam classification',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'submissionTime',
          type: 'number',
          admin: {
            description: 'Time taken to complete form (seconds)',
            readOnly: true,
          },
        },
        {
          name: 'pageUrl',
          type: 'text',
          admin: {
            description: 'URL where form was submitted',
            readOnly: true,
          },
        },
        {
          name: 'utmParameters',
          type: 'group',
          fields: [
            {
              name: 'source',
              type: 'text',
            },
            {
              name: 'medium',
              type: 'text',
            },
            {
              name: 'campaign',
              type: 'text',
            },
            {
              name: 'term',
              type: 'text',
            },
            {
              name: 'content',
              type: 'text',
            },
          ],
          admin: {
            description: 'UTM tracking parameters',
            readOnly: true,
          },
        },
        {
          name: 'device',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Desktop', value: 'desktop' },
                { label: 'Mobile', value: 'mobile' },
                { label: 'Tablet', value: 'tablet' },
              ],
            },
            {
              name: 'browser',
              type: 'text',
            },
            {
              name: 'os',
              type: 'text',
            },
          ],
          admin: {
            description: 'Device information',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User assigned to handle this submission',
      },
    },
    {
      name: 'notes',
      type: 'array',
      fields: [
        {
          name: 'note',
          type: 'textarea',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          defaultValue: () => new Date(),
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
      admin: {
        description: 'Internal notes about this submission',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Tags for categorization',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        // Extract submitter info from submission data
        if (operation === 'create' && data.submissionData) {
          const submissionData = typeof data.submissionData === 'string' 
            ? JSON.parse(data.submissionData) 
            : data.submissionData

          // Extract email and name
          const email = submissionData.email || submissionData.Email || submissionData.emailAddress
          const name = submissionData.name || submissionData.Name || 
                      `${submissionData.firstName || submissionData.first_name || ''} ${submissionData.lastName || submissionData.last_name || ''}`.trim()

          // Set top-level submitterEmail for useAsTitle
          data.submitterEmail = email

          data.submitter = {
            ...data.submitter,
            email,
            name: name || email,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            referrer: req.headers.referer || req.headers.referrer,
          }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          // Process the submission asynchronously
          // This would typically be handled by a background job
          try {
            await processFormSubmission(doc, req)
          } catch (error) {
            console.error('Error processing form submission:', error)
          }
        }
      },
    ],
  },
  timestamps: true,
}

// Helper function to process form submissions
async function processFormSubmission(submission: any, req: any) {
  // This would be implemented to:
  // 1. Calculate lead score
  // 2. Create or update lead record
  // 3. Send notifications
  // 4. Sync with CRM
  // 5. Trigger webhooks
  
  console.log('Processing form submission:', submission.id)
}

