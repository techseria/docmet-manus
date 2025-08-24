import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'status', 'score', 'source', 'createdAt'],
    useAsTitle: 'name',
    group: 'Forms & Leads',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Lead full name',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'First name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        description: 'Last name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        description: 'Primary email address',
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
      name: 'company',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Company name',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Company website',
          },
        },
        {
          name: 'industry',
          type: 'select',
          options: [
            { label: 'Technology', value: 'technology' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Finance', value: 'finance' },
            { label: 'Education', value: 'education' },
            { label: 'Retail', value: 'retail' },
            { label: 'Manufacturing', value: 'manufacturing' },
            { label: 'Real Estate', value: 'real_estate' },
            { label: 'Consulting', value: 'consulting' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Non-profit', value: 'non_profit' },
            { label: 'Government', value: 'government' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '501-1000 employees', value: '501-1000' },
            { label: '1000+ employees', value: '1000+' },
          ],
        },
        {
          name: 'revenue',
          type: 'select',
          options: [
            { label: 'Under $1M', value: 'under_1m' },
            { label: '$1M - $10M', value: '1m_10m' },
            { label: '$10M - $50M', value: '10m_50m' },
            { label: '$50M - $100M', value: '50m_100m' },
            { label: 'Over $100M', value: 'over_100m' },
          ],
        },
      ],
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        description: 'Job title or position',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
        {
          name: 'timezone',
          type: 'text',
        },
      ],
    },
    {
      name: 'source',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: '📝 Contact Form', value: 'contact_form' },
            { label: '🎯 Landing Page', value: 'landing_page' },
            { label: '📧 Email Campaign', value: 'email_campaign' },
            { label: '📱 Social Media', value: 'social_media' },
            { label: '🔍 Organic Search', value: 'organic_search' },
            { label: '💰 Paid Ads', value: 'paid_ads' },
            { label: '👥 Referral', value: 'referral' },
            { label: '📞 Phone Call', value: 'phone_call' },
            { label: '🎪 Event', value: 'event' },
            { label: '📰 Content', value: 'content' },
            { label: '🔗 Direct', value: 'direct' },
            { label: '📊 Other', value: 'other' },
          ],
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'form-builder',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'contact_form',
          },
        },
        {
          name: 'campaign',
          type: 'text',
          admin: {
            description: 'Campaign name or identifier',
          },
        },
        {
          name: 'medium',
          type: 'text',
          admin: {
            description: 'Traffic medium (e.g., cpc, email, social)',
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            description: 'Referring website or source',
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
        },
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
            description: 'Lead score (0-100)',
          },
        },
        {
          name: 'grade',
          type: 'select',
          defaultValue: 'unqualified',
          options: [
            { label: '🔥 Hot', value: 'hot' },
            { label: '🌡️ Warm', value: 'warm' },
            { label: '❄️ Cold', value: 'cold' },
            { label: '✅ Qualified', value: 'qualified' },
            { label: '❌ Unqualified', value: 'unqualified' },
          ],
        },
        {
          name: 'qualification',
          type: 'group',
          fields: [
            {
              name: 'budget',
              type: 'select',
              options: [
                { label: 'Under $1K', value: 'under_1k' },
                { label: '$1K - $5K', value: '1k_5k' },
                { label: '$5K - $10K', value: '5k_10k' },
                { label: '$10K - $25K', value: '10k_25k' },
                { label: '$25K - $50K', value: '25k_50k' },
                { label: 'Over $50K', value: 'over_50k' },
                { label: 'Unknown', value: 'unknown' },
              ],
            },
            {
              name: 'authority',
              type: 'select',
              options: [
                { label: 'Decision Maker', value: 'decision_maker' },
                { label: 'Influencer', value: 'influencer' },
                { label: 'User', value: 'user' },
                { label: 'Unknown', value: 'unknown' },
              ],
            },
            {
              name: 'need',
              type: 'select',
              options: [
                { label: 'Urgent', value: 'urgent' },
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
                { label: 'Unknown', value: 'unknown' },
              ],
            },
            {
              name: 'timeline',
              type: 'select',
              options: [
                { label: 'Immediate', value: 'immediate' },
                { label: '1-3 months', value: '1_3_months' },
                { label: '3-6 months', value: '3_6_months' },
                { label: '6-12 months', value: '6_12_months' },
                { label: 'Over 1 year', value: 'over_1_year' },
                { label: 'Unknown', value: 'unknown' },
              ],
            },
          ],
        },
        {
          name: 'scoringHistory',
          type: 'array',
          fields: [
            {
              name: 'date',
              type: 'date',
              defaultValue: () => new Date(),
            },
            {
              name: 'previousScore',
              type: 'number',
            },
            {
              name: 'newScore',
              type: 'number',
            },
            {
              name: 'reason',
              type: 'text',
            },
            {
              name: 'action',
              type: 'text',
            },
          ],
          admin: {
            description: 'Lead scoring history',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👀 Contacted', value: 'contacted' },
        { label: '✅ Qualified', value: 'qualified' },
        { label: '🎯 Opportunity', value: 'opportunity' },
        { label: '💰 Customer', value: 'customer' },
        { label: '❌ Lost', value: 'lost' },
        { label: '🚫 Unqualified', value: 'unqualified' },
        { label: '📞 Callback', value: 'callback' },
        { label: '📧 Nurture', value: 'nurture' },
      ],
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Sales rep or team member assigned to this lead',
      },
    },
    {
      name: 'activities',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: '📧 Email', value: 'email' },
            { label: '📞 Phone Call', value: 'phone_call' },
            { label: '💬 Meeting', value: 'meeting' },
            { label: '📝 Note', value: 'note' },
            { label: '📄 Proposal Sent', value: 'proposal_sent' },
            { label: '📋 Demo', value: 'demo' },
            { label: '🎯 Follow-up', value: 'follow_up' },
            { label: '📊 Other', value: 'other' },
          ],
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'date',
          type: 'date',
          defaultValue: () => new Date(),
        },
        {
          name: 'duration',
          type: 'number',
          admin: {
            description: 'Duration in minutes',
          },
        },
        {
          name: 'outcome',
          type: 'select',
          options: [
            { label: '✅ Successful', value: 'successful' },
            { label: '⏳ Follow-up Required', value: 'follow_up_required' },
            { label: '❌ No Response', value: 'no_response' },
            { label: '🚫 Not Interested', value: 'not_interested' },
            { label: '📞 Callback Requested', value: 'callback_requested' },
          ],
        },
        {
          name: 'nextAction',
          type: 'text',
          admin: {
            description: 'Next action to take',
          },
        },
        {
          name: 'nextActionDate',
          type: 'date',
          admin: {
            description: 'When to take next action',
          },
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'User who performed this activity',
          },
        },
      ],
      admin: {
        description: 'Lead activity history',
      },
    },
    {
      name: 'customFields',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
            { label: 'Boolean', value: 'boolean' },
            { label: 'URL', value: 'url' },
          ],
        },
      ],
      admin: {
        description: 'Custom lead data from forms',
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
        {
          name: 'private',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Private note (only visible to author)',
          },
        },
      ],
      admin: {
        description: 'Lead notes and comments',
      },
    },
    {
      name: 'communication',
      type: 'group',
      fields: [
        {
          name: 'preferences',
          type: 'group',
          fields: [
            {
              name: 'email',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'phone',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'sms',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'bestTimeToContact',
              type: 'select',
              options: [
                { label: 'Morning (9-12)', value: 'morning' },
                { label: 'Afternoon (12-17)', value: 'afternoon' },
                { label: 'Evening (17-20)', value: 'evening' },
                { label: 'Anytime', value: 'anytime' },
              ],
            },
          ],
        },
        {
          name: 'doNotContact',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Do not contact this lead',
          },
        },
        {
          name: 'unsubscribed',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Unsubscribed from marketing communications',
          },
        },
        {
          name: 'lastContactDate',
          type: 'date',
          admin: {
            description: 'Last time this lead was contacted',
            readOnly: true,
          },
        },
        {
          name: 'contactAttempts',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of contact attempts',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'pageViews',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of page views',
            readOnly: true,
          },
        },
        {
          name: 'emailOpens',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of email opens',
            readOnly: true,
          },
        },
        {
          name: 'emailClicks',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of email clicks',
            readOnly: true,
          },
        },
        {
          name: 'lastActivity',
          type: 'date',
          admin: {
            description: 'Last activity date',
            readOnly: true,
          },
        },
        {
          name: 'engagementScore',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Engagement score (0-100)',
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
        description: 'Whether this lead is active',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate name from firstName and lastName
        if ((data.firstName || data.lastName) && !data.name) {
          data.name = `${data.firstName || ''} ${data.lastName || ''}`.trim()
        }
        
        // Update last activity
        if (operation === 'update') {
          data.analytics = {
            ...data.analytics,
            lastActivity: new Date(),
          }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Initialize analytics for new leads
        if (operation === 'create') {
          await req.payload.update({
            collection: 'leads',
            id: doc.id,
            data: {
              analytics: {
                pageViews: 0,
                emailOpens: 0,
                emailClicks: 0,
                lastActivity: new Date(),
                engagementScore: 0,
              },
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}

