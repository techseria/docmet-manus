import type { Endpoint } from 'payload'
import { createSitemapEndpoint } from '../../utilities/seo/sitemapGenerator'

export const sitemapEndpoint: Endpoint = {
  path: '/sitemap.xml',
  method: 'get',
  handler: async (req) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const sitemap = await createSitemapEndpoint(req.payload, baseUrl)

      return new Response(sitemap, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      })
    } catch (error) {
      console.error('Error generating sitemap:', error)
      return new Response('Error generating sitemap', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }
  },
}

