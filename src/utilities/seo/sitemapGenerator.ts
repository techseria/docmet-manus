import type { Payload } from 'payload'

export interface SitemapEntry {
  url: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export class SitemapGenerator {
  private payload: Payload
  private baseUrl: string

  constructor(payload: Payload, baseUrl: string) {
    this.payload = payload
    this.baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
  }

  public async generateSitemap(): Promise<string> {
    const entries: SitemapEntry[] = []

    // Add static pages
    entries.push({
      url: this.baseUrl,
      changefreq: 'daily',
      priority: 1.0,
    })

    // Add dynamic pages
    await this.addPagesToSitemap(entries)
    await this.addPostsToSitemap(entries)
    await this.addProductsToSitemap(entries)

    return this.generateXML(entries)
  }

  private async addPagesToSitemap(entries: SitemapEntry[]): Promise<void> {
    try {
      const pages = await this.payload.find({
        collection: 'pages',
        where: {
          and: [
            { status: { equals: 'published' } },
            { slug: { not_equals: 'home' } }, // Exclude home page as it's already added
          ],
        },
        limit: 1000,
        depth: 0,
      })

      for (const page of pages.docs) {
        // Check if page should be included in sitemap
        const seoData = await this.getSEOData('page', page.id)
        
        if (seoData?.technicalSEO?.sitemap !== false) {
          entries.push({
            url: `${this.baseUrl}/${page.slug}`,
            lastmod: page.updatedAt,
            changefreq: seoData?.technicalSEO?.changeFrequency || 'weekly',
            priority: seoData?.technicalSEO?.priority || 0.8,
          })
        }
      }
    } catch (error) {
      console.error('Error adding pages to sitemap:', error)
    }
  }

  private async addPostsToSitemap(entries: SitemapEntry[]): Promise<void> {
    try {
      const posts = await this.payload.find({
        collection: 'posts',
        where: {
          status: { equals: 'published' },
        },
        limit: 1000,
        depth: 0,
      })

      for (const post of posts.docs) {
        const seoData = await this.getSEOData('post', post.id)
        
        if (seoData?.technicalSEO?.sitemap !== false) {
          entries.push({
            url: `${this.baseUrl}/blog/${post.slug}`,
            lastmod: post.updatedAt,
            changefreq: seoData?.technicalSEO?.changeFrequency || 'monthly',
            priority: seoData?.technicalSEO?.priority || 0.6,
          })
        }
      }
    } catch (error) {
      console.error('Error adding posts to sitemap:', error)
    }
  }

  private async addProductsToSitemap(entries: SitemapEntry[]): Promise<void> {
    try {
      // Check if products collection exists
      const collections = this.payload.config.collections
      const hasProducts = collections.some(collection => collection.slug === 'products')
      
      if (!hasProducts) return

      const products = await this.payload.find({
        collection: 'products',
        where: {
          status: { equals: 'published' },
        },
        limit: 1000,
        depth: 0,
      })

      for (const product of products.docs) {
        const seoData = await this.getSEOData('product', product.id)
        
        if (seoData?.technicalSEO?.sitemap !== false) {
          entries.push({
            url: `${this.baseUrl}/products/${product.slug}`,
            lastmod: product.updatedAt,
            changefreq: seoData?.technicalSEO?.changeFrequency || 'weekly',
            priority: seoData?.technicalSEO?.priority || 0.7,
          })
        }
      }
    } catch (error) {
      console.error('Error adding products to sitemap:', error)
    }
  }

  private async getSEOData(contentType: string, contentId: string): Promise<any> {
    try {
      const seoData = await this.payload.find({
        collection: 'seo',
        where: {
          and: [
            { contentType: { equals: contentType } },
            { contentId: { equals: contentId } },
          ],
        },
        limit: 1,
      })

      return seoData.docs.length > 0 ? seoData.docs[0] : null
    } catch (error) {
      console.error('Error fetching SEO data:', error)
      return null
    }
  }

  private generateXML(entries: SitemapEntry[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    const urlsetClose = '</urlset>'

    const urls = entries.map(entry => {
      let urlXml = '  <url>\n'
      urlXml += `    <loc>${this.escapeXML(entry.url)}</loc>\n`
      
      if (entry.lastmod) {
        const date = new Date(entry.lastmod).toISOString().split('T')[0]
        urlXml += `    <lastmod>${date}</lastmod>\n`
      }
      
      if (entry.changefreq) {
        urlXml += `    <changefreq>${entry.changefreq}</changefreq>\n`
      }
      
      if (entry.priority !== undefined) {
        urlXml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`
      }
      
      urlXml += '  </url>'
      return urlXml
    }).join('\n')

    return [xmlHeader, urlsetOpen, urls, urlsetClose].join('\n')
  }

  private escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
}

// Generate robots.txt content
export function generateRobotsTxt(baseUrl: string, sitemapUrl?: string): string {
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Disallow admin and API routes',
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    '# Sitemap',
    `Sitemap: ${sitemapUrl || `${baseUrl}/sitemap.xml`}`,
  ]

  return lines.join('\n')
}

// Utility function to create sitemap endpoint
export async function createSitemapEndpoint(payload: Payload, baseUrl: string): Promise<string> {
  const generator = new SitemapGenerator(payload, baseUrl)
  return await generator.generateSitemap()
}

// Utility function to ping search engines about sitemap updates
export async function pingSitemaps(sitemapUrl: string): Promise<void> {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ]

  const pingPromises = searchEngines.map(async (url) => {
    try {
      const response = await fetch(url)
      console.log(`Sitemap ping to ${url}: ${response.status}`)
    } catch (error) {
      console.error(`Error pinging ${url}:`, error)
    }
  })

  await Promise.all(pingPromises)
}

