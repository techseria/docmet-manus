import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const AISettings: GlobalConfig = {
  slug: 'ai-settings',
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: 'AI Assistant',
  },
  fields: [
    {
      name: 'general',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable AI-powered features across the platform',
          },
        },
        {
          name: 'defaultModel',
          type: 'select',
          defaultValue: 'gpt-4',
          options: [
            { label: 'GPT-4', value: 'gpt-4' },
            { label: 'GPT-4 Turbo', value: 'gpt-4-turbo-preview' },
            { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
          ],
          admin: {
            description: 'Default AI model for content generation',
          },
        },
        {
          name: 'defaultTemperature',
          type: 'number',
          min: 0,
          max: 2,
          defaultValue: 0.7,
          admin: {
            description: 'Default creativity level (0 = focused, 2 = very creative)',
          },
        },
        {
          name: 'maxTokensPerRequest',
          type: 'number',
          defaultValue: 2000,
          admin: {
            description: 'Maximum tokens per AI request',
          },
        },
      ],
    },
    {
      name: 'autoOptimization',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable automatic AI optimization for published content',
          },
        },
        {
          name: 'seoOptimization',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Automatically generate SEO suggestions',
          },
        },
        {
          name: 'metaGeneration',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Automatically generate meta descriptions for new content',
          },
        },
        {
          name: 'readabilityImprovement',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Automatically improve content readability',
          },
        },
        {
          name: 'triggerConditions',
          type: 'array',
          fields: [
            {
              name: 'contentType',
              type: 'select',
              options: [
                { label: 'Pages', value: 'pages' },
                { label: 'Posts', value: 'posts' },
                { label: 'All Content', value: 'all' },
              ],
            },
            {
              name: 'status',
              type: 'select',
              options: [
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
                { label: 'Any Status', value: 'any' },
              ],
            },
          ],
          admin: {
            description: 'Conditions that trigger automatic optimization',
          },
        },
      ],
    },
    {
      name: 'contentGeneration',
      type: 'group',
      fields: [
        {
          name: 'allowedTypes',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Blog Post', value: 'blog_post' },
                { label: 'Page Content', value: 'page_content' },
                { label: 'Email', value: 'email' },
                { label: 'Social Media', value: 'social_media' },
                { label: 'SEO Content', value: 'seo_content' },
                { label: 'Marketing Copy', value: 'marketing_copy' },
                { label: 'Product Description', value: 'product_description' },
                { label: 'Translation', value: 'translation' },
              ],
            },
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'maxRequestsPerDay',
              type: 'number',
              defaultValue: 100,
            },
          ],
          admin: {
            description: 'Configure which content types can be AI-generated',
          },
        },
        {
          name: 'templates',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Blog Post', value: 'blog_post' },
                { label: 'Page Content', value: 'page_content' },
                { label: 'Email', value: 'email' },
                { label: 'Social Media', value: 'social_media' },
                { label: 'Marketing Copy', value: 'marketing_copy' },
              ],
            },
            {
              name: 'systemPrompt',
              type: 'textarea',
              required: true,
            },
            {
              name: 'defaultTone',
              type: 'select',
              options: [
                { label: 'Professional', value: 'professional' },
                { label: 'Casual', value: 'casual' },
                { label: 'Friendly', value: 'friendly' },
                { label: 'Formal', value: 'formal' },
                { label: 'Conversational', value: 'conversational' },
                { label: 'Persuasive', value: 'persuasive' },
              ],
            },
            {
              name: 'defaultWordCount',
              type: 'number',
            },
          ],
          admin: {
            description: 'Pre-configured templates for content generation',
          },
        },
      ],
    },
    {
      name: 'translation',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable AI-powered translation features',
          },
        },
        {
          name: 'supportedLanguages',
          type: 'array',
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
              admin: {
                description: 'Language code (e.g., es, fr, de)',
              },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Language name (e.g., Spanish, French, German)',
              },
            },
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
          admin: {
            description: 'Languages available for AI translation',
          },
        },
        {
          name: 'autoTranslation',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Automatically translate content when published',
          },
        },
        {
          name: 'preserveFormatting',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Preserve HTML formatting in translations',
          },
        },
      ],
    },
    {
      name: 'costManagement',
      type: 'group',
      fields: [
        {
          name: 'monthlyBudget',
          type: 'number',
          admin: {
            description: 'Monthly budget limit in USD',
          },
        },
        {
          name: 'alertThreshold',
          type: 'number',
          defaultValue: 80,
          admin: {
            description: 'Send alert when budget usage reaches this percentage',
          },
        },
        {
          name: 'trackUsage',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Track AI usage and costs',
          },
        },
        {
          name: 'costPerModel',
          type: 'array',
          fields: [
            {
              name: 'model',
              type: 'text',
              required: true,
            },
            {
              name: 'inputCostPer1k',
              type: 'number',
              required: true,
              admin: {
                description: 'Cost per 1000 input tokens in USD',
              },
            },
            {
              name: 'outputCostPer1k',
              type: 'number',
              required: true,
              admin: {
                description: 'Cost per 1000 output tokens in USD',
              },
            },
          ],
          admin: {
            description: 'Cost configuration for different AI models',
          },
        },
      ],
    },
    {
      name: 'qualityControl',
      type: 'group',
      fields: [
        {
          name: 'minimumQualityScore',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 70,
          admin: {
            description: 'Minimum quality score for AI-generated content',
          },
        },
        {
          name: 'requireHumanReview',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Require human review for AI-generated content',
          },
        },
        {
          name: 'autoRegenerate',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Automatically regenerate content if quality score is too low',
          },
        },
        {
          name: 'contentFilters',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Profanity', value: 'profanity' },
                { label: 'Spam', value: 'spam' },
                { label: 'Inappropriate', value: 'inappropriate' },
                { label: 'Plagiarism', value: 'plagiarism' },
              ],
            },
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'action',
              type: 'select',
              options: [
                { label: 'Block', value: 'block' },
                { label: 'Flag for Review', value: 'flag' },
                { label: 'Auto-Fix', value: 'fix' },
              ],
            },
          ],
          admin: {
            description: 'Content filters for AI-generated content',
          },
        },
      ],
    },
    {
      name: 'integrations',
      type: 'group',
      fields: [
        {
          name: 'openai',
          type: 'group',
          fields: [
            {
              name: 'apiKey',
              type: 'text',
              admin: {
                description: 'OpenAI API Key (leave blank to use environment variable)',
              },
            },
            {
              name: 'baseUrl',
              type: 'text',
              admin: {
                description: 'OpenAI API Base URL (leave blank to use default)',
              },
            },
            {
              name: 'organization',
              type: 'text',
              admin: {
                description: 'OpenAI Organization ID (optional)',
              },
            },
          ],
        },
        {
          name: 'webhooks',
          type: 'array',
          fields: [
            {
              name: 'event',
              type: 'select',
              options: [
                { label: 'Content Generated', value: 'content_generated' },
                { label: 'Content Improved', value: 'content_improved' },
                { label: 'Translation Complete', value: 'translation_complete' },
                { label: 'Quality Alert', value: 'quality_alert' },
                { label: 'Budget Alert', value: 'budget_alert' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
          admin: {
            description: 'Webhook notifications for AI events',
          },
        },
      ],
    },
  ],
  timestamps: true,
}

