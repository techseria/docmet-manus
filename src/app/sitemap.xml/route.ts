import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = getServerSideURL()

  // Get all published pages
  const pages = await payload.find({
    collection: 'pages',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    pagination: false,
  })

  // Get all published posts
  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    pagination: false,
  })

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const pageUrls = pages.docs.map((page) => ({
    url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: page.slug === 'home' ? 1.0 : 0.7,
  }))

  const postUrls = posts.docs.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const allUrls = [...staticPages, ...pageUrls, ...postUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

