import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { analyticsAccess } from '../../access/rbac'

export const SEO: CollectionConfig = {
  slug: 'seo',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'contentType', 'seoScore', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'SEO & Analytics',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'SEO record title for identification',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Blog Post', value: 'post' },
        { label: 'Product', value: 'product' },
        { label: 'Category', value: 'category' },
      ],
    },
    {
      name: 'contentId',
      type: 'text',
      required: true,
      admin: {
        description: 'ID of the content item this SEO record belongs to',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Full URL of the content',
      },
    },
    {
      name: 'basicSEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'SEO title (recommended: 50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO meta description (recommended: 150-160 characters)',
          },
        },
        {
          name: 'focusKeyword',
          type: 'text',
          admin: {
            description: 'Primary keyword to optimize for',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          fields: [
            {
              name: 'keyword',
              type: 'text',
              required: true,
            },
            {
              name: 'density',
              type: 'number',
              admin: {
                description: 'Keyword density percentage',
              },
            },
            {
              name: 'position',
              type: 'number',
              admin: {
                description: 'Average search ranking position',
              },
            },
          ],
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description: 'Canonical URL to prevent duplicate content',
          },
        },
      ],
    },
    {
      name: 'technicalSEO',
      type: 'group',
      fields: [
        {
          name: 'robots',
          type: 'select',
          defaultValue: 'index,follow',
          options: [
            { label: 'Index, Follow', value: 'index,follow' },
            { label: 'No Index, Follow', value: 'noindex,follow' },
            { label: 'Index, No Follow', value: 'index,nofollow' },
            { label: 'No Index, No Follow', value: 'noindex,nofollow' },
          ],
        },
        {
          name: 'sitemap',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Include in XML sitemap',
          },
        },
        {
          name: 'priority',
          type: 'number',
          min: 0,
          max: 1,
          defaultValue: 0.5,
          admin: {
            description: 'Sitemap priority (0.0 - 1.0)',
          },
        },
        {
          name: 'changeFrequency',
          type: 'select',
          defaultValue: 'weekly',
          options: [
            { label: 'Always', value: 'always' },
            { label: 'Hourly', value: 'hourly' },
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
            { label: 'Never', value: 'never' },
          ],
        },
        {
          name: 'hreflang',
          type: 'array',
          fields: [
            {
              name: 'language',
              type: 'text',
              required: true,
              admin: {
                description: 'Language code (e.g., en, es, fr)',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                description: 'URL for this language version',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'structuredData',
      type: 'group',
      fields: [
        {
          name: 'schemaType',
          type: 'select',
          options: [
            { label: 'Article', value: 'Article' },
            { label: 'BlogPosting', value: 'BlogPosting' },
            { label: 'WebPage', value: 'WebPage' },
            { label: 'Product', value: 'Product' },
            { label: 'Organization', value: 'Organization' },
            { label: 'Person', value: 'Person' },
            { label: 'Event', value: 'Event' },
            { label: 'FAQ', value: 'FAQPage' },
          ],
        },
        {
          name: 'customSchema',
          type: 'json',
          admin: {
            description: 'Custom JSON-LD structured data',
          },
        },
        {
          name: 'breadcrumbs',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'ogTitle',
          type: 'text',
          admin: {
            description: 'Open Graph title',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          admin: {
            description: 'Open Graph description',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image',
          },
        },
        {
          name: 'ogType',
          type: 'select',
          defaultValue: 'website',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'Article', value: 'article' },
            { label: 'Product', value: 'product' },
            { label: 'Video', value: 'video' },
          ],
        },
        {
          name: 'twitterCard',
          type: 'select',
          defaultValue: 'summary',
          options: [
            { label: 'Summary', value: 'summary' },
            { label: 'Summary Large Image', value: 'summary_large_image' },
            { label: 'App', value: 'app' },
            { label: 'Player', value: 'player' },
          ],
        },
        {
          name: 'twitterSite',
          type: 'text',
          admin: {
            description: 'Twitter @username for the website',
          },
        },
        {
          name: 'twitterCreator',
          type: 'text',
          admin: {
            description: 'Twitter @username for content creator',
          },
        },
      ],
    },
    {
      name: 'analysis',
      type: 'group',
      fields: [
        {
          name: 'seoScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Overall SEO score (0-100)',
            readOnly: true,
          },
        },
        {
          name: 'readabilityScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Content readability score (0-100)',
            readOnly: true,
          },
        },
        {
          name: 'issues',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: '🔴 Error', value: 'error' },
                { label: '🟡 Warning', value: 'warning' },
                { label: '🔵 Info', value: 'info' },
              ],
            },
            {
              name: 'category',
              type: 'select',
              options: [
                { label: 'Title', value: 'title' },
                { label: 'Description', value: 'description' },
                { label: 'Keywords', value: 'keywords' },
                { label: 'Content', value: 'content' },
                { label: 'Images', value: 'images' },
                { label: 'Links', value: 'links' },
                { label: 'Technical', value: 'technical' },
              ],
            },
            {
              name: 'message',
              type: 'text',
              required: true,
            },
            {
              name: 'suggestion',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'lastAnalyzed',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'performance',
      type: 'group',
      fields: [
        {
          name: 'pageSpeed',
          type: 'group',
          fields: [
            {
              name: 'desktop',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                description: 'Google PageSpeed score for desktop',
              },
            },
            {
              name: 'mobile',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                description: 'Google PageSpeed score for mobile',
              },
            },
            {
              name: 'lastChecked',
              type: 'date',
            },
          ],
        },
        {
          name: 'coreWebVitals',
          type: 'group',
          fields: [
            {
              name: 'lcp',
              type: 'number',
              admin: {
                description: 'Largest Contentful Paint (seconds)',
              },
            },
            {
              name: 'fid',
              type: 'number',
              admin: {
                description: 'First Input Delay (milliseconds)',
              },
            },
            {
              name: 'cls',
              type: 'number',
              admin: {
                description: 'Cumulative Layout Shift',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'tracking',
      type: 'group',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'text',
          admin: {
            description: 'Google Analytics tracking ID',
          },
        },
        {
          name: 'googleTagManager',
          type: 'text',
          admin: {
            description: 'Google Tag Manager ID',
          },
        },
        {
          name: 'facebookPixel',
          type: 'text',
          admin: {
            description: 'Facebook Pixel ID',
          },
        },
        {
          name: 'customTracking',
          type: 'textarea',
          admin: {
            description: 'Custom tracking code',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: '✅ Active', value: 'active' },
        { label: '⏸️ Paused', value: 'paused' },
        { label: '🗃️ Archived', value: 'archived' },
      ],
    },
    {
      name: 'autoOptimize',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Automatically optimize SEO based on AI suggestions',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate canonical URL if not provided
        if (!data.basicSEO?.canonicalUrl && data.url) {
          data.basicSEO = {
            ...data.basicSEO,
            canonicalUrl: data.url,
          }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Trigger SEO analysis after changes
        if (operation === 'update' || operation === 'create') {
          // This would trigger the SEO analysis function
          // Implementation would analyze content and update scores
        }
      },
    ],
  },
  timestamps: true,
}

