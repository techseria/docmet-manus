import OpenAI from 'openai'

export interface ContentGenerationRequest {
  type: string
  userPrompt: string
  systemPrompt?: string
  keywords?: string[]
  tone?: string
  targetAudience?: string
  wordCount?: number
  language?: string
  focusKeyword?: string
  model?: string
  temperature?: number
  maxTokens?: number
  topP?: number
}

export interface ContentGenerationResponse {
  content: string
  metaTitle?: string
  metaDescription?: string
  seoSuggestions?: Array<{
    type: string
    suggestion: string
    priority: string
  }>
  qualityScore?: number
  readabilityScore?: number
  tokensUsed: number
  estimatedCost: number
}

export class AIContentGenerator {
  private openai: OpenAI
  private readonly tokenCosts = {
    'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
    'gpt-4-turbo-preview': { input: 0.01, output: 0.03 },
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
  }

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_BASE,
    })
  }

  public async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const systemPrompt = this.buildSystemPrompt(request)
    const userPrompt = this.buildUserPrompt(request)

    try {
      const completion = await this.openai.chat.completions.create({
        model: request.model || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
        top_p: request.topP || 1,
      })

      const content = completion.choices[0]?.message?.content || ''
      const tokensUsed = completion.usage?.total_tokens || 0
      const estimatedCost = this.calculateCost(request.model || 'gpt-4', tokensUsed)

      // Generate SEO metadata if requested
      let metaTitle: string | undefined
      let metaDescription: string | undefined
      let seoSuggestions: Array<{ type: string; suggestion: string; priority: string }> | undefined

      if (request.focusKeyword) {
        const seoData = await this.generateSEOMetadata(content, request.focusKeyword, request.language)
        metaTitle = seoData.metaTitle
        metaDescription = seoData.metaDescription
        seoSuggestions = seoData.suggestions
      }

      // Calculate quality scores
      const qualityScore = this.calculateQualityScore(content, request)
      const readabilityScore = this.calculateReadabilityScore(content)

      return {
        content,
        metaTitle,
        metaDescription,
        seoSuggestions,
        qualityScore,
        readabilityScore,
        tokensUsed,
        estimatedCost,
      }
    } catch (error) {
      console.error('Error generating content:', error)
      throw new Error('Failed to generate content')
    }
  }

  public async improveContent(
    originalContent: string,
    improvementType: 'seo' | 'readability' | 'engagement' | 'grammar',
    focusKeyword?: string
  ): Promise<string> {
    const systemPrompt = this.buildImprovementPrompt(improvementType, focusKeyword)

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Improve this content:\n\n${originalContent}` },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      })

      return completion.choices[0]?.message?.content || originalContent
    } catch (error) {
      console.error('Error improving content:', error)
      return originalContent
    }
  }

  public async translateContent(
    content: string,
    targetLanguage: string,
    preserveFormatting: boolean = true
  ): Promise<string> {
    const systemPrompt = `You are a professional translator. Translate the following content to ${targetLanguage}. ${
      preserveFormatting ? 'Preserve all HTML formatting, links, and structure.' : 'Focus on natural, fluent translation.'
    } Maintain the original tone and style.`

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: content },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      })

      return completion.choices[0]?.message?.content || content
    } catch (error) {
      console.error('Error translating content:', error)
      return content
    }
  }

  public async generateSEOSuggestions(
    content: string,
    focusKeyword: string,
    currentTitle?: string,
    currentDescription?: string
  ): Promise<Array<{ type: string; suggestion: string; priority: string }>> {
    const systemPrompt = `You are an SEO expert. Analyze the provided content and generate specific, actionable SEO improvement suggestions. Focus on the keyword "${focusKeyword}". Return suggestions in JSON format with type, suggestion, and priority (high/medium/low).`

    const userPrompt = `
Content: ${content}
Focus Keyword: ${focusKeyword}
Current Title: ${currentTitle || 'Not provided'}
Current Description: ${currentDescription || 'Not provided'}

Provide SEO suggestions in this JSON format:
[
  {
    "type": "keyword|readability|structure|meta",
    "suggestion": "Specific actionable suggestion",
    "priority": "high|medium|low"
  }
]
`

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 1000,
      })

      const response = completion.choices[0]?.message?.content || '[]'
      return JSON.parse(response)
    } catch (error) {
      console.error('Error generating SEO suggestions:', error)
      return []
    }
  }

  private buildSystemPrompt(request: ContentGenerationRequest): string {
    let prompt = `You are a professional content writer specializing in ${request.type.replace('_', ' ')}. `

    if (request.tone) {
      prompt += `Write in a ${request.tone} tone. `
    }

    if (request.targetAudience) {
      prompt += `Target audience: ${request.targetAudience}. `
    }

    if (request.language && request.language !== 'en') {
      prompt += `Write in ${this.getLanguageName(request.language)}. `
    }

    if (request.keywords && request.keywords.length > 0) {
      prompt += `Include these keywords naturally: ${request.keywords.join(', ')}. `
    }

    if (request.focusKeyword) {
      prompt += `Focus keyword for SEO: "${request.focusKeyword}". Use it naturally throughout the content. `
    }

    if (request.wordCount) {
      prompt += `Target word count: approximately ${request.wordCount} words. `
    }

    prompt += `Create high-quality, engaging, and original content. Use proper formatting with headings, paragraphs, and lists where appropriate.`

    if (request.systemPrompt) {
      prompt += `\n\nAdditional instructions: ${request.systemPrompt}`
    }

    return prompt
  }

  private buildUserPrompt(request: ContentGenerationRequest): string {
    return request.userPrompt
  }

  private buildImprovementPrompt(
    type: 'seo' | 'readability' | 'engagement' | 'grammar',
    focusKeyword?: string
  ): string {
    switch (type) {
      case 'seo':
        return `You are an SEO expert. Improve the provided content for better search engine optimization. ${
          focusKeyword ? `Focus on the keyword "${focusKeyword}".` : ''
        } Maintain the original meaning and structure while optimizing for SEO.`
      
      case 'readability':
        return 'You are a content editor focused on readability. Improve the provided content to make it more readable and accessible. Use shorter sentences, simpler words where appropriate, and better paragraph structure.'
      
      case 'engagement':
        return 'You are a content strategist focused on engagement. Improve the provided content to make it more engaging and compelling. Add hooks, improve flow, and make it more interesting to read.'
      
      case 'grammar':
        return 'You are a professional editor. Improve the grammar, spelling, and overall writing quality of the provided content. Maintain the original tone and meaning.'
      
      default:
        return 'Improve the provided content for better quality and effectiveness.'
    }
  }

  private async generateSEOMetadata(
    content: string,
    focusKeyword: string,
    language?: string
  ): Promise<{
    metaTitle: string
    metaDescription: string
    suggestions: Array<{ type: string; suggestion: string; priority: string }>
  }> {
    const systemPrompt = `You are an SEO expert. Generate optimized meta title and description for the provided content. Focus keyword: "${focusKeyword}". ${
      language ? `Language: ${this.getLanguageName(language)}.` : ''
    } Return response in JSON format.`

    const userPrompt = `
Content: ${content.substring(0, 1000)}...
Focus Keyword: ${focusKeyword}

Generate SEO metadata in this JSON format:
{
  "metaTitle": "SEO-optimized title (50-60 characters)",
  "metaDescription": "SEO-optimized description (150-160 characters)",
  "suggestions": [
    {
      "type": "meta",
      "suggestion": "Specific suggestion",
      "priority": "high|medium|low"
    }
  ]
}
`

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 500,
      })

      const response = completion.choices[0]?.message?.content || '{}'
      const parsed = JSON.parse(response)
      
      return {
        metaTitle: parsed.metaTitle || '',
        metaDescription: parsed.metaDescription || '',
        suggestions: parsed.suggestions || [],
      }
    } catch (error) {
      console.error('Error generating SEO metadata:', error)
      return {
        metaTitle: '',
        metaDescription: '',
        suggestions: [],
      }
    }
  }

  private calculateCost(model: string, tokens: number): number {
    const costs = this.tokenCosts[model as keyof typeof this.tokenCosts]
    if (!costs) return 0

    // Rough estimation: assume 75% input, 25% output tokens
    const inputTokens = Math.floor(tokens * 0.75)
    const outputTokens = Math.floor(tokens * 0.25)

    return ((inputTokens * costs.input) + (outputTokens * costs.output)) / 1000
  }

  private calculateQualityScore(content: string, request: ContentGenerationRequest): number {
    let score = 100

    // Check word count alignment
    if (request.wordCount) {
      const actualWordCount = content.split(/\s+/).length
      const deviation = Math.abs(actualWordCount - request.wordCount) / request.wordCount
      if (deviation > 0.2) score -= 10
    }

    // Check keyword inclusion
    if (request.keywords && request.keywords.length > 0) {
      const contentLower = content.toLowerCase()
      const includedKeywords = request.keywords.filter(keyword => 
        contentLower.includes(keyword.toLowerCase())
      )
      const keywordScore = (includedKeywords.length / request.keywords.length) * 20
      score = score - 20 + keywordScore
    }

    // Check structure (headings, paragraphs)
    const hasHeadings = /<h[1-6]/.test(content) || /^#+\s/.test(content)
    const hasParagraphs = content.split('\n\n').length > 1
    
    if (!hasHeadings) score -= 5
    if (!hasParagraphs) score -= 5

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private calculateReadabilityScore(content: string): number {
    // Simple readability calculation
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

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private getLanguageName(code: string): string {
    const languages: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      ru: 'Russian',
      zh: 'Chinese',
      ja: 'Japanese',
    }
    return languages[code] || 'English'
  }
}

// Utility function to generate content via API
export async function generateAIContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
  const generator = new AIContentGenerator()
  return await generator.generateContent(request)
}

// Utility function to improve existing content
export async function improveAIContent(
  content: string,
  type: 'seo' | 'readability' | 'engagement' | 'grammar',
  focusKeyword?: string
): Promise<string> {
  const generator = new AIContentGenerator()
  return await generator.improveContent(content, type, focusKeyword)
}

// Utility function to translate content
export async function translateAIContent(
  content: string,
  targetLanguage: string,
  preserveFormatting: boolean = true
): Promise<string> {
  const generator = new AIContentGenerator()
  return await generator.translateContent(content, targetLanguage, preserveFormatting)
}

