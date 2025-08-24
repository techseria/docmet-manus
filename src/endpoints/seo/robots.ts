import type { Endpoint } from 'payload'
import { generateRobotsTxt } from '../../utilities/seo/sitemapGenerator'

export const robotsEndpoint: Endpoint = {
  path: '/robots.txt',
  method: 'get',
  handler: async (req) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const sitemapUrl = `${baseUrl}/sitemap.xml`
      const robotsTxt = generateRobotsTxt(baseUrl, sitemapUrl)

      return new Response(robotsTxt, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      })
    } catch (error) {
      console.error('Error generating robots.txt:', error)
      return new Response('Error generating robots.txt', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }
  },
}

