// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { MediaFolders } from './collections/MediaFolders'
import { MediaCollections } from './collections/MediaCollections'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Roles } from './collections/Roles'
import { Departments } from './collections/Departments'
import { ContentWorkflow } from './collections/ContentWorkflow'
import { ContentVersions } from './collections/ContentVersions'
import { SEO } from './collections/SEO'
import { Analytics } from './collections/Analytics'
import { AIContent } from './collections/AIContent'
import { FormBuilder } from './collections/FormBuilder'
import { Leads } from './collections/Leads'
import { FormSubmissions } from './collections/FormSubmissions'
import { Testimonials } from './collections/Testimonials'
import { Features } from './collections/Features'
import { Pricing } from './collections/Pricing'


import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { About } from './globals/About'
import { AISettings } from './globals/ai/AISettings'
import { sitemapEndpoint } from './endpoints/seo/sitemap'
import { robotsEndpoint } from './endpoints/seo/robots'
import { analyticsDataEndpoint, seoScoreEndpoint } from './endpoints/seo/analytics'
import { generateContentEndpoint, improveContentEndpoint, translateContentEndpoint, seoSuggestionsEndpoint } from './endpoints/ai/generate'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// import { seed } from './seed'

export default buildConfig({
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED === 'true') {
      payload.logger.info('Seeding database...')
      // await seed(payload)
      payload.logger.info('Database seeded!')
    }
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Pages, Posts, Media, MediaFolders, MediaCollections, Categories, Users, Roles, Departments, ContentWorkflow, ContentVersions, SEO, Analytics, AIContent, FormBuilder, Leads, FormSubmissions, Testimonials, Features, Pricing],
  cors: [getServerSideURL()].filter(Boolean),
  endpoints: [
    sitemapEndpoint,
    robotsEndpoint,
    analyticsDataEndpoint,
    seoScoreEndpoint,
    generateContentEndpoint,
    improveContentEndpoint,
    translateContentEndpoint,
    seoSuggestionsEndpoint,
  ],
  globals: [Header, Footer, About, AISettings],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
