import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { editorAccess } from '../../access/rbac'

export const FormBuilder: CollectionConfig = {
  slug: 'form-builder',
  access: {
    admin: authenticated,
    create: editorAccess,
    delete: authenticated,
    read: authenticated,
    update: editorAccess,
  },
  admin: {
    defaultColumns: ['name', 'type', 'status', 'submissions', 'createdAt'],
    useAsTitle: 'name',
    group: 'Forms & Leads',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Form name for identification',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly form identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Form description and purpose',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: '📞 Contact Form', value: 'contact' },
        { label: '🎯 Lead Generation', value: 'lead_generation' },
        { label: '📝 Newsletter Signup', value: 'newsletter' },
        { label: '📋 Survey', value: 'survey' },
        { label: '🎫 Event Registration', value: 'event_registration' },
        { label: '💼 Job Application', value: 'job_application' },
        { label: '🛒 Order Form', value: 'order_form' },
        { label: '💬 Feedback', value: 'feedback' },
        { label: '🎁 Contest Entry', value: 'contest' },
        { label: '📞 Callback Request', value: 'callback' },
        { label: '💰 Quote Request', value: 'quote' },
        { label: '🔧 Support Ticket', value: 'support' },
        { label: '📊 Custom Form', value: 'custom' },
      ],
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique field identifier',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Field label displayed to users',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Input', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Number', value: 'number' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select Dropdown', value: 'select' },
            { label: 'Radio Buttons', value: 'radio' },
            { label: 'Checkboxes', value: 'checkbox' },
            { label: 'File Upload', value: 'file' },
            { label: 'Date', value: 'date' },
            { label: 'Time', value: 'time' },
            { label: 'URL', value: 'url' },
            { label: 'Hidden Field', value: 'hidden' },
            { label: 'HTML Content', value: 'html' },
            { label: 'Divider', value: 'divider' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            description: 'Placeholder text for input fields',
          },
        },
        {
          name: 'helpText',
          type: 'text',
          admin: {
            description: 'Help text displayed below the field',
          },
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make this field required',
          },
        },
        {
          name: 'validation',
          type: 'group',
          fields: [
            {
              name: 'minLength',
              type: 'number',
              admin: {
                description: 'Minimum character length',
              },
            },
            {
              name: 'maxLength',
              type: 'number',
              admin: {
                description: 'Maximum character length',
              },
            },
            {
              name: 'pattern',
              type: 'text',
              admin: {
                description: 'Regular expression pattern',
              },
            },
            {
              name: 'customValidation',
              type: 'textarea',
              admin: {
                description: 'Custom validation JavaScript function',
              },
            },
          ],
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (data, siblingData) => 
              ['select', 'radio', 'checkbox'].includes(siblingData?.type),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'selected',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'conditionalLogic',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'conditions',
              type: 'array',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
              fields: [
                {
                  name: 'field',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Field ID to check',
                  },
                },
                {
                  name: 'operator',
                  type: 'select',
                  options: [
                    { label: 'Equals', value: 'equals' },
                    { label: 'Not Equals', value: 'not_equals' },
                    { label: 'Contains', value: 'contains' },
                    { label: 'Greater Than', value: 'greater_than' },
                    { label: 'Less Than', value: 'less_than' },
                    { label: 'Is Empty', value: 'is_empty' },
                    { label: 'Is Not Empty', value: 'is_not_empty' },
                  ],
                },
                {
                  name: 'value',
                  type: 'text',
                  admin: {
                    description: 'Value to compare against',
                  },
                },
              ],
            },
            {
              name: 'action',
              type: 'select',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
              options: [
                { label: 'Show Field', value: 'show' },
                { label: 'Hide Field', value: 'hide' },
                { label: 'Enable Field', value: 'enable' },
                { label: 'Disable Field', value: 'disable' },
              ],
            },
          ],
        },
        {
          name: 'styling',
          type: 'group',
          fields: [
            {
              name: 'width',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Half Width', value: 'half' },
                { label: 'One Third', value: 'third' },
                { label: 'Two Thirds', value: 'two-thirds' },
                { label: 'One Quarter', value: 'quarter' },
              ],
            },
            {
              name: 'cssClass',
              type: 'text',
              admin: {
                description: 'Custom CSS classes',
              },
            },
            {
              name: 'customStyles',
              type: 'textarea',
              admin: {
                description: 'Custom CSS styles',
              },
            },
          ],
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Field display order',
          },
        },
      ],
      admin: {
        description: 'Form fields configuration',
      },
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'submitButtonText',
          type: 'text',
          defaultValue: 'Submit',
          admin: {
            description: 'Submit button text',
          },
        },
        {
          name: 'successMessage',
          type: 'textarea',
          defaultValue: 'Thank you for your submission!',
          admin: {
            description: 'Message shown after successful submission',
          },
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          defaultValue: 'There was an error submitting the form. Please try again.',
          admin: {
            description: 'Message shown on submission error',
          },
        },
        {
          name: 'redirectUrl',
          type: 'text',
          admin: {
            description: 'URL to redirect to after submission (optional)',
          },
        },
        {
          name: 'allowMultipleSubmissions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow multiple submissions from same user/IP',
          },
        },
        {
          name: 'requireCaptcha',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Require CAPTCHA verification',
          },
        },
        {
          name: 'honeypot',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable honeypot spam protection',
          },
        },
      ],
    },
    {
      name: 'notifications',
      type: 'group',
      fields: [
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Send email notifications on submission',
          },
        },
        {
          name: 'notificationEmails',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.emailNotifications,
          },
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'role',
              type: 'select',
              options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Sales', value: 'sales' },
                { label: 'Support', value: 'support' },
                { label: 'Marketing', value: 'marketing' },
              ],
            },
          ],
        },
        {
          name: 'autoResponder',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'subject',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'message',
              type: 'textarea',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
        {
          name: 'webhookUrl',
          type: 'text',
          admin: {
            description: 'Webhook URL for external integrations',
          },
        },
      ],
    },
    {
      name: 'leadScoring',
      type: 'group',
      admin: {
        condition: (data) => data?.type === 'lead_generation',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'scoringRules',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
          fields: [
            {
              name: 'field',
              type: 'text',
              required: true,
              admin: {
                description: 'Field ID to score',
              },
            },
            {
              name: 'condition',
              type: 'select',
              options: [
                { label: 'Equals', value: 'equals' },
                { label: 'Contains', value: 'contains' },
                { label: 'Greater Than', value: 'greater_than' },
                { label: 'Less Than', value: 'less_than' },
                { label: 'Is Filled', value: 'is_filled' },
              ],
            },
            {
              name: 'value',
              type: 'text',
              admin: {
                description: 'Value to match against',
              },
            },
            {
              name: 'score',
              type: 'number',
              required: true,
              admin: {
                description: 'Points to add/subtract',
              },
            },
          ],
        },
        {
          name: 'qualificationThreshold',
          type: 'number',
          defaultValue: 50,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Minimum score for qualified lead',
          },
        },
      ],
    },
    {
      name: 'integrations',
      type: 'group',
      fields: [
        {
          name: 'crm',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'provider',
              type: 'select',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
              options: [
                { label: 'Salesforce', value: 'salesforce' },
                { label: 'HubSpot', value: 'hubspot' },
                { label: 'Pipedrive', value: 'pipedrive' },
                { label: 'Zoho CRM', value: 'zoho' },
                { label: 'Custom API', value: 'custom' },
              ],
            },
            {
              name: 'apiKey',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'fieldMapping',
              type: 'array',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
              fields: [
                {
                  name: 'formField',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'crmField',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'emailMarketing',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'provider',
              type: 'select',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
              options: [
                { label: 'Mailchimp', value: 'mailchimp' },
                { label: 'Constant Contact', value: 'constant_contact' },
                { label: 'Campaign Monitor', value: 'campaign_monitor' },
                { label: 'AWeber', value: 'aweber' },
                { label: 'ConvertKit', value: 'convertkit' },
              ],
            },
            {
              name: 'listId',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'apiKey',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'submissions',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Total number of submissions',
            readOnly: true,
          },
        },
        {
          name: 'views',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Total number of form views',
            readOnly: true,
          },
        },
        {
          name: 'conversionRate',
          type: 'number',
          admin: {
            description: 'Conversion rate percentage',
            readOnly: true,
          },
        },
        {
          name: 'averageCompletionTime',
          type: 'number',
          admin: {
            description: 'Average time to complete form (seconds)',
            readOnly: true,
          },
        },
        {
          name: 'abandonmentRate',
          type: 'number',
          admin: {
            description: 'Form abandonment rate percentage',
            readOnly: true,
          },
        },
        {
          name: 'lastSubmission',
          type: 'date',
          admin: {
            description: 'Date of last submission',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: '📝 Draft', value: 'draft' },
        { label: '✅ Active', value: 'active' },
        { label: '⏸️ Paused', value: 'paused' },
        { label: '🗃️ Archived', value: 'archived' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Form creator',
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
        
        // Set author to current user if not specified
        if (operation === 'create' && !data.author) {
          // This would be set from the request context
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Initialize analytics for new forms
        if (operation === 'create') {
          await req.payload.update({
            collection: 'form-builder',
            id: doc.id,
            data: {
              analytics: {
                submissions: 0,
                views: 0,
                conversionRate: 0,
                averageCompletionTime: 0,
                abandonmentRate: 0,
              },
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}

