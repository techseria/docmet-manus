import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'filesize', 'mimeType', 'createdAt'],
    useAsTitle: 'filename',
    group: 'Media Management',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Caption displayed with the media',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO-friendly title for the media',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Detailed description of the media content',
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
            description: 'Keywords for searchability',
          },
        },
        {
          name: 'photographer',
          type: 'text',
          admin: {
            description: 'Photographer or creator name',
          },
        },
        {
          name: 'copyright',
          type: 'text',
          admin: {
            description: 'Copyright information',
          },
        },
        {
          name: 'license',
          type: 'select',
          options: [
            { label: 'All Rights Reserved', value: 'all_rights_reserved' },
            { label: 'Creative Commons', value: 'creative_commons' },
            { label: 'Public Domain', value: 'public_domain' },
            { label: 'Royalty Free', value: 'royalty_free' },
            { label: 'Editorial Use Only', value: 'editorial_only' },
          ],
          admin: {
            description: 'Usage license for the media',
          },
        },
      ],
    },
    {
      name: 'organization',
      type: 'group',
      fields: [
        {
          name: 'folder',
          type: 'relationship',
          relationTo: 'media-folders',
          admin: {
            description: 'Organize media into folders',
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
            description: 'Tags for easy categorization',
          },
        },
        {
          name: 'collections',
          type: 'array',
          fields: [
            {
              name: 'collection',
              type: 'relationship',
              relationTo: 'media-collections',
            },
          ],
          admin: {
            description: 'Add to media collections',
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: '✅ Active', value: 'active' },
            { label: '📋 Draft', value: 'draft' },
            { label: '🗃️ Archived', value: 'archived' },
            { label: '🚫 Disabled', value: 'disabled' },
          ],
        },
      ],
    },
    {
      name: 'processing',
      type: 'group',
      fields: [
        {
          name: 'optimized',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Whether the media has been optimized',
            readOnly: true,
          },
        },
        {
          name: 'compressionLevel',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Compression level applied (0-100)',
            readOnly: true,
          },
        },
        {
          name: 'originalSize',
          type: 'number',
          admin: {
            description: 'Original file size in bytes',
            readOnly: true,
          },
        },
        {
          name: 'optimizedSize',
          type: 'number',
          admin: {
            description: 'Optimized file size in bytes',
            readOnly: true,
          },
        },
        {
          name: 'formats',
          type: 'array',
          fields: [
            {
              name: 'format',
              type: 'select',
              options: [
                { label: 'WebP', value: 'webp' },
                { label: 'AVIF', value: 'avif' },
                { label: 'JPEG', value: 'jpeg' },
                { label: 'PNG', value: 'png' },
              ],
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'size',
              type: 'number',
            },
          ],
          admin: {
            description: 'Available formats for this media',
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
          name: 'views',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of times this media has been viewed',
            readOnly: true,
          },
        },
        {
          name: 'downloads',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of times this media has been downloaded',
            readOnly: true,
          },
        },
        {
          name: 'usageCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of times this media is used in content',
            readOnly: true,
          },
        },
        {
          name: 'lastUsed',
          type: 'date',
          admin: {
            description: 'Last time this media was used',
            readOnly: true,
          },
        },
        {
          name: 'usedIn',
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
            },
            {
              name: 'contentTitle',
              type: 'text',
            },
            {
              name: 'usedAt',
              type: 'date',
            },
          ],
          admin: {
            description: 'Content where this media is used',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'focusKeyword',
          type: 'text',
          admin: {
            description: 'Primary keyword for this media',
          },
        },
        {
          name: 'seoScore',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'SEO optimization score',
            readOnly: true,
          },
        },
        {
          name: 'altTextOptimized',
          type: 'checkbox',
          admin: {
            description: 'Whether alt text is SEO optimized',
            readOnly: true,
          },
        },
        {
          name: 'filenameOptimized',
          type: 'checkbox',
          admin: {
            description: 'Whether filename is SEO optimized',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'video',
      type: 'group',
      admin: {
        condition: (data) => data?.mimeType?.startsWith('video/'),
      },
      fields: [
        {
          name: 'duration',
          type: 'number',
          admin: {
            description: 'Video duration in seconds',
            readOnly: true,
          },
        },
        {
          name: 'resolution',
          type: 'group',
          fields: [
            {
              name: 'width',
              type: 'number',
            },
            {
              name: 'height',
              type: 'number',
            },
          ],
        },
        {
          name: 'frameRate',
          type: 'number',
          admin: {
            description: 'Frames per second',
            readOnly: true,
          },
        },
        {
          name: 'bitrate',
          type: 'number',
          admin: {
            description: 'Video bitrate',
            readOnly: true,
          },
        },
        {
          name: 'codec',
          type: 'text',
          admin: {
            description: 'Video codec used',
            readOnly: true,
          },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Video thumbnail image',
          },
        },
        {
          name: 'subtitles',
          type: 'array',
          fields: [
            {
              name: 'language',
              type: 'text',
              required: true,
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'audio',
      type: 'group',
      admin: {
        condition: (data) => data?.mimeType?.startsWith('audio/'),
      },
      fields: [
        {
          name: 'duration',
          type: 'number',
          admin: {
            description: 'Audio duration in seconds',
            readOnly: true,
          },
        },
        {
          name: 'bitrate',
          type: 'number',
          admin: {
            description: 'Audio bitrate',
            readOnly: true,
          },
        },
        {
          name: 'sampleRate',
          type: 'number',
          admin: {
            description: 'Sample rate in Hz',
            readOnly: true,
          },
        },
        {
          name: 'channels',
          type: 'number',
          admin: {
            description: 'Number of audio channels',
            readOnly: true,
          },
        },
        {
          name: 'codec',
          type: 'text',
          admin: {
            description: 'Audio codec used',
            readOnly: true,
          },
        },
      ],
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
      {
        name: 'webp_small',
        width: 600,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'webp_medium',
        width: 900,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'webp_large',
        width: 1400,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
    ],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate SEO-friendly filename
        if (operation === 'create' && data.filename) {
          const seoFilename = data.filename
            .toLowerCase()
            .replace(/[^a-z0-9.-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
          
          if (seoFilename !== data.filename) {
            data.filename = seoFilename
            data.seo = {
              ...data.seo,
              filenameOptimized: true,
            }
          }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Track media usage and analytics
        if (operation === 'create') {
          // Initialize analytics
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              analytics: {
                views: 0,
                downloads: 0,
                usageCount: 0,
              },
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}


