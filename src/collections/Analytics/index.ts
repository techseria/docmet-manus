import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { analyticsAccess } from '../../access/rbac'

export const Analytics: CollectionConfig = {
  slug: 'analytics',
  access: {
    admin: analyticsAccess,
    create: authenticated,
    delete: analyticsAccess,
    read: analyticsAccess,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'type', 'period', 'value', 'date'],
    useAsTitle: 'title',
    group: 'SEO & Analytics',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Analytics record title',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: '👁️ Page Views', value: 'pageviews' },
        { label: '👥 Unique Visitors', value: 'unique_visitors' },
        { label: '⏱️ Session Duration', value: 'session_duration' },
        { label: '📈 Bounce Rate', value: 'bounce_rate' },
        { label: '🔍 Search Impressions', value: 'search_impressions' },
        { label: '🖱️ Search Clicks', value: 'search_clicks' },
        { label: '📊 CTR', value: 'ctr' },
        { label: '📍 Search Position', value: 'search_position' },
        { label: '💰 Conversions', value: 'conversions' },
        { label: '📱 Device Type', value: 'device_type' },
        { label: '🌍 Geographic', value: 'geographic' },
        { label: '🔗 Referral Source', value: 'referral_source' },
      ],
    },
    {
      name: 'contentType',
      type: 'select',
      options: [
        { label: 'All Content', value: 'all' },
        { label: 'Pages', value: 'page' },
        { label: 'Blog Posts', value: 'post' },
        { label: 'Products', value: 'product' },
        { label: 'Categories', value: 'category' },
      ],
    },
    {
      name: 'contentId',
      type: 'text',
      admin: {
        description: 'Specific content ID (optional)',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Specific URL being tracked',
      },
    },
    {
      name: 'period',
      type: 'select',
      required: true,
      defaultValue: 'daily',
      options: [
        { label: 'Hourly', value: 'hourly' },
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Yearly', value: 'yearly' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date for this analytics data point',
      },
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
          admin: {
            description: 'Primary metric value',
          },
        },
        {
          name: 'previousValue',
          type: 'number',
          admin: {
            description: 'Previous period value for comparison',
          },
        },
        {
          name: 'change',
          type: 'number',
          admin: {
            description: 'Percentage change from previous period',
            readOnly: true,
          },
        },
        {
          name: 'trend',
          type: 'select',
          options: [
            { label: '📈 Increasing', value: 'increasing' },
            { label: '📉 Decreasing', value: 'decreasing' },
            { label: '➡️ Stable', value: 'stable' },
          ],
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        {
          name: 'source',
          type: 'select',
          options: [
            { label: 'Google Analytics', value: 'google_analytics' },
            { label: 'Google Search Console', value: 'google_search_console' },
            { label: 'Facebook Analytics', value: 'facebook_analytics' },
            { label: 'Custom Tracking', value: 'custom' },
          ],
        },
        {
          name: 'device',
          type: 'select',
          options: [
            { label: 'All Devices', value: 'all' },
            { label: 'Desktop', value: 'desktop' },
            { label: 'Mobile', value: 'mobile' },
            { label: 'Tablet', value: 'tablet' },
          ],
        },
        {
          name: 'country',
          type: 'text',
          admin: {
            description: 'Country code (e.g., US, UK, CA)',
          },
        },
        {
          name: 'region',
          type: 'text',
          admin: {
            description: 'Region or state',
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            description: 'City name',
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            description: 'Traffic source/referrer',
          },
        },
        {
          name: 'keyword',
          type: 'text',
          admin: {
            description: 'Search keyword (if applicable)',
          },
        },
      ],
    },
    {
      name: 'goals',
      type: 'group',
      fields: [
        {
          name: 'target',
          type: 'number',
          admin: {
            description: 'Target value for this metric',
          },
        },
        {
          name: 'achieved',
          type: 'checkbox',
          admin: {
            description: 'Whether target was achieved',
            readOnly: true,
          },
        },
        {
          name: 'performance',
          type: 'number',
          admin: {
            description: 'Performance percentage vs target',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'alerts',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable alerts for this metric',
          },
        },
        {
          name: 'threshold',
          type: 'number',
          admin: {
            description: 'Alert threshold value',
          },
        },
        {
          name: 'condition',
          type: 'select',
          options: [
            { label: 'Greater than', value: 'gt' },
            { label: 'Less than', value: 'lt' },
            { label: 'Equal to', value: 'eq' },
            { label: 'Change by %', value: 'change' },
          ],
        },
        {
          name: 'recipients',
          type: 'array',
          fields: [
            {
              name: 'email',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'customData',
      type: 'json',
      admin: {
        description: 'Additional custom analytics data',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this analytics record is active',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate change percentage
        if (data.metrics?.value && data.metrics?.previousValue) {
          const change = ((data.metrics.value - data.metrics.previousValue) / data.metrics.previousValue) * 100
          data.metrics.change = Math.round(change * 100) / 100
          
          // Determine trend
          if (change > 5) {
            data.metrics.trend = 'increasing'
          } else if (change < -5) {
            data.metrics.trend = 'decreasing'
          } else {
            data.metrics.trend = 'stable'
          }
        }
        
        // Check goal achievement
        if (data.goals?.target && data.metrics?.value) {
          data.goals.achieved = data.metrics.value >= data.goals.target
          data.goals.performance = Math.round((data.metrics.value / data.goals.target) * 100)
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Check for alerts
        if (doc.alerts?.enabled && doc.alerts?.threshold) {
          const shouldAlert = checkAlertCondition(doc)
          if (shouldAlert) {
            // Send alert notifications
            // Implementation would send emails to recipients
          }
        }
      },
    ],
  },
  timestamps: true,
}

// Helper function to check alert conditions
function checkAlertCondition(doc: any): boolean {
  const { value } = doc.metrics || {}
  const { threshold, condition } = doc.alerts || {}
  
  if (!value || !threshold || !condition) return false
  
  switch (condition) {
    case 'gt':
      return value > threshold
    case 'lt':
      return value < threshold
    case 'eq':
      return value === threshold
    case 'change':
      return Math.abs(doc.metrics?.change || 0) > threshold
    default:
      return false
  }
}

