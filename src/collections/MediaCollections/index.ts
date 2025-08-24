import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const MediaCollections: CollectionConfig = {
  slug: 'media-collections',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'type', 'mediaCount', 'isPublic', 'createdAt'],
    useAsTitle: 'name',
    group: 'Media Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Collection name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly collection identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Collection description',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: '📸 Photo Gallery', value: 'photo_gallery' },
        { label: '🎥 Video Collection', value: 'video_collection' },
        { label: '🎵 Audio Library', value: 'audio_library' },
        { label: '📄 Document Set', value: 'document_set' },
        { label: '🎨 Design Assets', value: 'design_assets' },
        { label: '📱 Social Media', value: 'social_media' },
        { label: '🛍️ Product Images', value: 'product_images' },
        { label: '📰 Press Kit', value: 'press_kit' },
        { label: '🏢 Brand Assets', value: 'brand_assets' },
        { label: '📊 Infographics', value: 'infographics' },
        { label: '🎯 Marketing', value: 'marketing' },
        { label: '📚 Educational', value: 'educational' },
        { label: '🔧 Mixed Media', value: 'mixed_media' },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Cover image for the collection',
      },
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'mediaItem',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Display order in collection',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Feature this item in the collection',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Custom caption for this item in the collection',
          },
        },
      ],
      admin: {
        description: 'Media items in this collection',
      },
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'isPublic',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make this collection publicly viewable',
          },
        },
        {
          name: 'allowDownloads',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Allow users to download media from this collection',
          },
        },
        {
          name: 'requireLogin',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Require login to view this collection',
          },
        },
        {
          name: 'password',
          type: 'text',
          admin: {
            description: 'Password protection for the collection (optional)',
          },
        },
        {
          name: 'expiresAt',
          type: 'date',
          admin: {
            description: 'Collection expiration date (optional)',
          },
        },
      ],
    },
    {
      name: 'sharing',
      type: 'group',
      fields: [
        {
          name: 'shareUrl',
          type: 'text',
          admin: {
            description: 'Public sharing URL',
            readOnly: true,
          },
        },
        {
          name: 'embedCode',
          type: 'textarea',
          admin: {
            description: 'Embed code for websites',
            readOnly: true,
          },
        },
        {
          name: 'socialSharing',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow social media sharing',
          },
        },
        {
          name: 'allowComments',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Allow comments on the collection',
          },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
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
          name: 'category',
          type: 'select',
          options: [
            { label: 'Business', value: 'business' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Design', value: 'design' },
            { label: 'Photography', value: 'photography' },
            { label: 'Video', value: 'video' },
            { label: 'Audio', value: 'audio' },
            { label: 'Documents', value: 'documents' },
            { label: 'Education', value: 'education' },
            { label: 'Entertainment', value: 'entertainment' },
            { label: 'News', value: 'news' },
            { label: 'Sports', value: 'sports' },
            { label: 'Technology', value: 'technology' },
            { label: 'Travel', value: 'travel' },
            { label: 'Food', value: 'food' },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Health', value: 'health' },
            { label: 'Science', value: 'science' },
            { label: 'Art', value: 'art' },
            { label: 'Music', value: 'music' },
            { label: 'Other', value: 'other' },
          ],
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
            description: 'SEO keywords for the collection',
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
            description: 'Number of collection views',
            readOnly: true,
          },
        },
        {
          name: 'downloads',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of downloads from this collection',
            readOnly: true,
          },
        },
        {
          name: 'shares',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of times collection was shared',
            readOnly: true,
          },
        },
        {
          name: 'mediaCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of media items in collection',
            readOnly: true,
          },
        },
        {
          name: 'lastViewed',
          type: 'date',
          admin: {
            description: 'Last time collection was viewed',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Collection owner',
      },
    },
    {
      name: 'collaborators',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          defaultValue: 'viewer',
          options: [
            { label: 'Viewer', value: 'viewer' },
            { label: 'Editor', value: 'editor' },
            { label: 'Admin', value: 'admin' },
          ],
        },
        {
          name: 'addedAt',
          type: 'date',
          defaultValue: () => new Date(),
        },
      ],
      admin: {
        description: 'Users who can collaborate on this collection',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this collection is active',
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
        
        // Update media count
        if (data.media && Array.isArray(data.media)) {
          data.analytics = {
            ...data.analytics,
            mediaCount: data.media.length,
          }
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Generate sharing URLs and embed codes
        if (operation === 'create' || (operation === 'update' && doc.settings?.isPublic)) {
          const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
          const shareUrl = `${baseUrl}/collections/${doc.slug}`
          const embedCode = `<iframe src="${shareUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`
          
          await req.payload.update({
            collection: 'media-collections',
            id: doc.id,
            data: {
              sharing: {
                ...doc.sharing,
                shareUrl,
                embedCode,
              },
            },
          })
        }
      },
    ],
  },
  timestamps: true,
}

