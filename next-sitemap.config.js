/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://docmet.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://docmet.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }

    // Higher priority for important pages
    if (path === '/') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    } else if (path.includes('/features') || path.includes('/pricing')) {
      customConfig.priority = 0.9
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/blog') || path.includes('/posts')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'weekly'
    }

    return customConfig
  },
}

