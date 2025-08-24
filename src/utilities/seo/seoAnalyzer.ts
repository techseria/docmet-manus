import type { PayloadRequest } from 'payload'

export interface SEOAnalysisResult {
  score: number
  issues: Array<{
    type: 'error' | 'warning' | 'info'
    category: string
    message: string
    suggestion?: string
  }>
  readabilityScore: number
  recommendations: string[]
}

export interface ContentData {
  title?: string
  content?: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  url?: string
  images?: Array<{ alt?: string; src?: string }>
  links?: Array<{ href?: string; text?: string; isInternal?: boolean }>
}

export class SEOAnalyzer {
  private content: ContentData
  private issues: SEOAnalysisResult['issues'] = []
  private recommendations: string[] = []

  constructor(content: ContentData) {
    this.content = content
  }

  public analyze(): SEOAnalysisResult {
    this.issues = []
    this.recommendations = []

    // Analyze different SEO aspects
    this.analyzeTitleTag()
    this.analyzeMetaDescription()
    this.analyzeContent()
    this.analyzeKeywords()
    this.analyzeImages()
    this.analyzeLinks()
    this.analyzeURL()

    const score = this.calculateOverallScore()
    const readabilityScore = this.calculateReadabilityScore()

    return {
      score,
      issues: this.issues,
      readabilityScore,
      recommendations: this.recommendations,
    }
  }

  private analyzeTitleTag(): void {
    const title = this.content.metaTitle || this.content.title || ''
    
    if (!title) {
      this.addIssue('error', 'title', 'Missing title tag', 'Add a descriptive title tag')
      return
    }

    if (title.length < 30) {
      this.addIssue('warning', 'title', 'Title tag is too short', 'Aim for 50-60 characters')
    } else if (title.length > 60) {
      this.addIssue('warning', 'title', 'Title tag is too long', 'Keep it under 60 characters')
    }

    // Check if focus keyword is in title
    const focusKeyword = this.content.focusKeyword?.toLowerCase()
    if (focusKeyword && !title.toLowerCase().includes(focusKeyword)) {
      this.addIssue('warning', 'title', 'Focus keyword not in title', 'Include your focus keyword in the title')
    }

    // Check for title keyword stuffing
    const words = title.toLowerCase().split(' ')
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const repeatedWords = Object.entries(wordCount).filter(([word, count]) => 
      count > 2 && word.length > 3
    )

    if (repeatedWords.length > 0) {
      this.addIssue('warning', 'title', 'Possible keyword stuffing in title', 'Avoid repeating keywords too often')
    }
  }

  private analyzeMetaDescription(): void {
    const description = this.content.metaDescription || ''
    
    if (!description) {
      this.addIssue('error', 'description', 'Missing meta description', 'Add a compelling meta description')
      return
    }

    if (description.length < 120) {
      this.addIssue('warning', 'description', 'Meta description is too short', 'Aim for 150-160 characters')
    } else if (description.length > 160) {
      this.addIssue('warning', 'description', 'Meta description is too long', 'Keep it under 160 characters')
    }

    // Check if focus keyword is in description
    const focusKeyword = this.content.focusKeyword?.toLowerCase()
    if (focusKeyword && !description.toLowerCase().includes(focusKeyword)) {
      this.addIssue('info', 'description', 'Focus keyword not in meta description', 'Consider including your focus keyword')
    }
  }

  private analyzeContent(): void {
    const content = this.content.content || ''
    
    if (!content) {
      this.addIssue('error', 'content', 'No content found', 'Add meaningful content to your page')
      return
    }

    const wordCount = content.split(/\s+/).length
    
    if (wordCount < 300) {
      this.addIssue('warning', 'content', 'Content is too short', 'Aim for at least 300 words for better SEO')
    }

    // Check for headings structure
    const headingMatches = content.match(/<h[1-6][^>]*>/gi) || []
    if (headingMatches.length === 0) {
      this.addIssue('warning', 'content', 'No headings found', 'Use headings (H1, H2, H3) to structure your content')
    }

    // Check for H1 tag
    const h1Matches = content.match(/<h1[^>]*>/gi) || []
    if (h1Matches.length === 0) {
      this.addIssue('warning', 'content', 'No H1 tag found', 'Add an H1 tag to your content')
    } else if (h1Matches.length > 1) {
      this.addIssue('warning', 'content', 'Multiple H1 tags found', 'Use only one H1 tag per page')
    }

    // Check paragraph length
    const paragraphs = content.split(/<\/p>|<br\s*\/?>/i)
    const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 150)
    
    if (longParagraphs.length > 0) {
      this.addIssue('info', 'content', 'Some paragraphs are very long', 'Break up long paragraphs for better readability')
    }
  }

  private analyzeKeywords(): void {
    const focusKeyword = this.content.focusKeyword?.toLowerCase()
    const content = this.content.content?.toLowerCase() || ''
    
    if (!focusKeyword) {
      this.addIssue('info', 'keywords', 'No focus keyword set', 'Set a focus keyword to optimize for')
      return
    }

    // Calculate keyword density
    const words = content.split(/\s+/)
    const keywordOccurrences = words.filter(word => 
      word.includes(focusKeyword) || focusKeyword.includes(word)
    ).length
    
    const density = (keywordOccurrences / words.length) * 100

    if (density < 0.5) {
      this.addIssue('warning', 'keywords', 'Keyword density is too low', 'Use your focus keyword more naturally in the content')
    } else if (density > 3) {
      this.addIssue('warning', 'keywords', 'Keyword density is too high', 'Reduce keyword usage to avoid over-optimization')
    }

    // Check keyword in first paragraph
    const firstParagraph = content.substring(0, 200)
    if (!firstParagraph.includes(focusKeyword)) {
      this.addIssue('info', 'keywords', 'Focus keyword not in first paragraph', 'Include your focus keyword early in the content')
    }
  }

  private analyzeImages(): void {
    const images = this.content.images || []
    
    if (images.length === 0) {
      this.addIssue('info', 'images', 'No images found', 'Add relevant images to enhance your content')
      return
    }

    const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim() === '')
    
    if (imagesWithoutAlt.length > 0) {
      this.addIssue('error', 'images', `${imagesWithoutAlt.length} images missing alt text`, 'Add descriptive alt text to all images')
    }

    // Check for focus keyword in alt text
    const focusKeyword = this.content.focusKeyword?.toLowerCase()
    if (focusKeyword) {
      const keywordInAlt = images.some(img => 
        img.alt?.toLowerCase().includes(focusKeyword)
      )
      
      if (!keywordInAlt) {
        this.addIssue('info', 'images', 'Focus keyword not in any image alt text', 'Consider including your focus keyword in at least one image alt text')
      }
    }
  }

  private analyzeLinks(): void {
    const links = this.content.links || []
    
    if (links.length === 0) {
      this.addIssue('info', 'links', 'No links found', 'Add relevant internal and external links')
      return
    }

    const internalLinks = links.filter(link => link.isInternal)
    const externalLinks = links.filter(link => !link.isInternal)

    if (internalLinks.length === 0) {
      this.addIssue('warning', 'links', 'No internal links found', 'Add internal links to related content')
    }

    if (externalLinks.length === 0) {
      this.addIssue('info', 'links', 'No external links found', 'Consider linking to authoritative external sources')
    }

    // Check for links without anchor text
    const emptyLinks = links.filter(link => !link.text || link.text.trim() === '')
    if (emptyLinks.length > 0) {
      this.addIssue('warning', 'links', 'Links with empty anchor text', 'Use descriptive anchor text for all links')
    }
  }

  private analyzeURL(): void {
    const url = this.content.url || ''
    
    if (!url) {
      this.addIssue('info', 'technical', 'No URL provided for analysis')
      return
    }

    // Check URL length
    if (url.length > 100) {
      this.addIssue('warning', 'technical', 'URL is too long', 'Keep URLs under 100 characters when possible')
    }

    // Check for focus keyword in URL
    const focusKeyword = this.content.focusKeyword?.toLowerCase()
    if (focusKeyword && !url.toLowerCase().includes(focusKeyword)) {
      this.addIssue('info', 'technical', 'Focus keyword not in URL', 'Consider including your focus keyword in the URL')
    }

    // Check for URL structure
    const urlParts = url.split('/')
    if (urlParts.length > 6) {
      this.addIssue('info', 'technical', 'URL has many levels', 'Consider simplifying the URL structure')
    }

    // Check for underscores in URL
    if (url.includes('_')) {
      this.addIssue('info', 'technical', 'URL contains underscores', 'Use hyphens instead of underscores in URLs')
    }
  }

  private calculateOverallScore(): number {
    const errorWeight = -15
    const warningWeight = -8
    const infoWeight = -3

    let deductions = 0
    
    this.issues.forEach(issue => {
      switch (issue.type) {
        case 'error':
          deductions += errorWeight
          break
        case 'warning':
          deductions += warningWeight
          break
        case 'info':
          deductions += infoWeight
          break
      }
    })

    const score = Math.max(0, Math.min(100, 100 + deductions))
    return Math.round(score)
  }

  private calculateReadabilityScore(): number {
    const content = this.content.content || ''
    
    if (!content) return 0

    // Simple readability calculation based on:
    // - Average sentence length
    // - Average word length
    // - Use of headings
    // - Paragraph structure

    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = content.split(/\s+/).filter(w => w.length > 0)
    const avgSentenceLength = words.length / sentences.length
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length

    let score = 100

    // Penalize long sentences
    if (avgSentenceLength > 20) {
      score -= (avgSentenceLength - 20) * 2
    }

    // Penalize long words
    if (avgWordLength > 6) {
      score -= (avgWordLength - 6) * 5
    }

    // Bonus for headings
    const headingCount = (content.match(/<h[1-6][^>]*>/gi) || []).length
    if (headingCount > 0) {
      score += Math.min(10, headingCount * 2)
    }

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private addIssue(
    type: 'error' | 'warning' | 'info',
    category: string,
    message: string,
    suggestion?: string
  ): void {
    this.issues.push({ type, category, message, suggestion })
    
    if (suggestion) {
      this.recommendations.push(suggestion)
    }
  }
}

// Utility function to analyze content and update SEO record
export async function analyzeSEOForContent(
  payload: any,
  contentType: string,
  contentId: string,
  contentData: ContentData
): Promise<SEOAnalysisResult> {
  const analyzer = new SEOAnalyzer(contentData)
  const result = analyzer.analyze()

  try {
    // Find existing SEO record
    const existingSEO = await payload.find({
      collection: 'seo',
      where: {
        and: [
          { contentType: { equals: contentType } },
          { contentId: { equals: contentId } },
        ],
      },
      limit: 1,
    })

    const seoData = {
      analysis: {
        seoScore: result.score,
        readabilityScore: result.readabilityScore,
        issues: result.issues,
        lastAnalyzed: new Date(),
      },
    }

    if (existingSEO.docs.length > 0) {
      // Update existing record
      await payload.update({
        collection: 'seo',
        id: existingSEO.docs[0].id,
        data: seoData,
      })
    } else {
      // Create new record
      await payload.create({
        collection: 'seo',
        data: {
          title: `SEO Analysis - ${contentData.title || contentId}`,
          contentType,
          contentId,
          url: contentData.url || '',
          ...seoData,
        },
      })
    }
  } catch (error) {
    console.error('Error updating SEO analysis:', error)
  }

  return result
}

// Generate structured data for content
export function generateStructuredData(
  contentType: string,
  contentData: ContentData,
  schemaType?: string
): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType || getDefaultSchemaType(contentType),
  }

  switch (schemaType || getDefaultSchemaType(contentType)) {
    case 'Article':
    case 'BlogPosting':
      return {
        ...baseSchema,
        headline: contentData.title,
        description: contentData.metaDescription,
        url: contentData.url,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Your Organization',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Your Organization',
        },
      }

    case 'WebPage':
      return {
        ...baseSchema,
        name: contentData.title,
        description: contentData.metaDescription,
        url: contentData.url,
      }

    default:
      return baseSchema
  }
}

function getDefaultSchemaType(contentType: string): string {
  switch (contentType) {
    case 'post':
      return 'BlogPosting'
    case 'page':
      return 'WebPage'
    case 'product':
      return 'Product'
    default:
      return 'WebPage'
  }
}

