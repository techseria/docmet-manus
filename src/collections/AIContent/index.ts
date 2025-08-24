import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { editorAccess } from '../../access/rbac'

export const AIContent: CollectionConfig = {
  slug: 'ai-content',
  access: {
    admin: authenticated,
    create: editorAccess,
    delete: authenticated,
    read: authenticated,
    update: editorAccess,
  },
  admin: {
    defaultColumns: ['title', 'type', 'status', 'aiModel', 'createdAt'],
    useAsTitle: 'title',
    group: 'AI Assistant',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for this AI-generated content',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: '📝 Blog Post', value: 'blog_post' },
        { label: '📄 Page Content', value: 'page_content' },
        { label: '📧 Email', value: 'email' },
        { label: '📱 Social Media', value: 'social_media' },
        { label: '🔍 SEO Content', value: 'seo_content' },
        { label: '📢 Marketing Copy', value: 'marketing_copy' },
        { label: '📋 Product Description', value: 'product_description' },
        { label: '🌐 Translation', value: 'translation' },
      ],
    },
    {
      name: 'prompt',
      type: 'group',
      fields: [
        {
          name: 'userPrompt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'User input prompt for content generation',
          },
        },
        {
          name: 'systemPrompt',
          type: 'textarea',
          admin: {
            description: 'System prompt for AI behavior control',
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
          ],
          admin: {
            description: 'Keywords to include in the content',
          },
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'professional',
          options: [
            { label: 'Professional', value: 'professional' },
            { label: 'Casual', value: 'casual' },
            { label: 'Friendly', value: 'friendly' },
            { label: 'Formal', value: 'formal' },
            { label: 'Conversational', value: 'conversational' },
            { label: 'Persuasive', value: 'persuasive' },
            { label: 'Educational', value: 'educational' },
            { label: 'Creative', value: 'creative' },
          ],
        },
        {
          name: 'targetAudience',
          type: 'text',
          admin: {
            description: 'Target audience for the content',
          },
        },
        {
          name: 'wordCount',
          type: 'number',
          admin: {
            description: 'Desired word count (approximate)',
          },
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
            { label: 'Italian', value: 'it' },
            { label: 'Portuguese', value: 'pt' },
            { label: 'Dutch', value: 'nl' },
            { label: 'Russian', value: 'ru' },
            { label: 'Chinese', value: 'zh' },
            { label: 'Japanese', value: 'ja' },
          ],
        },
      ],
    },
    {
      name: 'aiSettings',
      type: 'group',
      fields: [
        {
          name: 'model',
          type: 'select',
          defaultValue: 'gpt-4',
          options: [
            { label: 'GPT-4', value: 'gpt-4' },
            { label: 'GPT-4 Turbo', value: 'gpt-4-turbo-preview' },
            { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
          ],
        },
        {
          name: 'temperature',
          type: 'number',
          min: 0,
          max: 2,
          defaultValue: 0.7,
          admin: {
            description: 'Creativity level (0 = focused, 2 = very creative)',
          },
        },
        {
          name: 'maxTokens',
          type: 'number',
          defaultValue: 2000,
          admin: {
            description: 'Maximum tokens to generate',
          },
        },
        {
          name: 'topP',
          type: 'number',
          min: 0,
          max: 1,
          defaultValue: 1,
          admin: {
            description: 'Nucleus sampling parameter',
          },
        },
      ],
    },
    {
      name: 'generatedContent',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          admin: {
            description: 'AI-generated content',
          },
        },
        {
          name: 'rawContent',
          type: 'textarea',
          admin: {
            description: 'Raw AI response for reference',
          },
        },
        {
          name: 'alternatives',
          type: 'array',
          fields: [
            {
              name: 'version',
              type: 'number',
              required: true,
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              admin: {
                description: 'Quality score (0-100)',
              },
            },
          ],
          admin: {
            description: 'Alternative content versions',
          },
        },
      ],
    },
    {
      name: 'seoOptimization',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable SEO optimization',
          },
        },
        {
          name: 'focusKeyword',
          type: 'text',
          admin: {
            description: 'Primary keyword for SEO optimization',
          },
        },
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'AI-generated meta title',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'AI-generated meta description',
          },
        },
        {
          name: 'suggestions',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Keyword Usage', value: 'keyword' },
                { label: 'Readability', value: 'readability' },
                { label: 'Structure', value: 'structure' },
                { label: 'Meta Tags', value: 'meta' },
              ],
            },
            {
              name: 'suggestion',
              type: 'text',
              required: true,
            },
            {
              name: 'priority',
              type: 'select',
              options: [
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'quality',
      type: 'group',
      fields: [
        {
          name: 'score',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Overall content quality score',
            readOnly: true,
          },
        },
        {
          name: 'readabilityScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Content readability score',
            readOnly: true,
          },
        },
        {
          name: 'originalityScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Content originality score',
            readOnly: true,
          },
        },
        {
          name: 'grammarScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Grammar and spelling score',
            readOnly: true,
          },
        },
        {
          name: 'feedback',
          type: 'array',
          fields: [
            {
              name: 'aspect',
              type: 'text',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              min: 1,
              max: 5,
              required: true,
            },
            {
              name: 'comment',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'usage',
      type: 'group',
      fields: [
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
          name: 'appliedTo',
          type: 'array',
          fields: [
            {
              name: 'contentType',
              type: 'select',
              options: [
                { label: 'Page', value: 'page' },
                { label: 'Post', value: 'post' },
                { label: 'Product', value: 'product' },
              ],
            },
            {
              name: 'contentId',
              type: 'text',
              required: true,
            },
            {
              name: 'appliedAt',
              type: 'date',
              defaultValue: () => new Date(),
            },
          ],
          admin: {
            description: 'Where this AI content has been applied',
          },
        },
        {
          name: 'regenerationCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of times content was regenerated',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'costs',
      type: 'group',
      fields: [
        {
          name: 'tokensUsed',
          type: 'number',
          admin: {
            description: 'Total tokens consumed',
            readOnly: true,
          },
        },
        {
          name: 'estimatedCost',
          type: 'number',
          admin: {
            description: 'Estimated cost in USD',
            readOnly: true,
          },
        },
        {
          name: 'requestCount',
          type: 'number',
          defaultValue: 1,
          admin: {
            description: 'Number of API requests made',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User who requested this AI content',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this AI content record is active',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Set author to current user if not specified
        if (operation === 'create' && !data.author) {
          // This would be set from the request context
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Track usage statistics
        if (operation === 'create') {
          // Log AI content generation for analytics
        }
      },
    ],
  },
  timestamps: true,
}

