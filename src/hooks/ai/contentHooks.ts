import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'
import { generateAIContent, improveAIContent } from '../../utilities/ai/contentGenerator'
import { analyzeSEOForContent } from '../../utilities/seo/seoAnalyzer'

// Hook to automatically generate AI-powered SEO suggestions
export const aiSEOOptimizationHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only process published content
  if (doc.status !== 'published' || operation !== 'update') {
    return doc
  }

  try {
    // Check if AI optimization is enabled for this content type
    const aiSettings = await req.payload.findGlobal({
      slug: 'ai-settings',
    })

    if (!aiSettings?.autoOptimization?.enabled) {
      return doc
    }

    // Extract content for analysis
    const contentText = extractTextContent(doc)
    const focusKeyword = doc.meta?.focusKeyword || doc.seo?.focusKeyword

    if (!contentText || !focusKeyword) {
      return doc
    }

    // Generate AI-powered SEO suggestions
    const { AIContentGenerator } = await import('../../utilities/ai/contentGenerator')
    const generator = new AIContentGenerator()
    
    const suggestions = await generator.generateSEOSuggestions(
      contentText,
      focusKeyword,
      doc.meta?.title || doc.title,
      doc.meta?.description
    )

    // Update SEO record with AI suggestions
    const existingSEO = await req.payload.find({
      collection: 'seo',
      where: {
        and: [
          { contentType: { equals: req.collection?.config?.slug || 'other' } },
          { contentId: { equals: doc.id } },
        ],
      },
      limit: 1,
    })

    const seoData = {
      analysis: {
        issues: suggestions.map(s => ({
          type: s.priority === 'high' ? 'error' : s.priority === 'medium' ? 'warning' : 'info',
          category: s.type,
          message: s.suggestion,
          suggestion: s.suggestion,
        })),
        lastAnalyzed: new Date(),
      },
    }

    if (existingSEO.docs.length > 0) {
      await req.payload.update({
        collection: 'seo',
        id: existingSEO.docs[0].id,
        data: seoData,
      })
    }

    // Create AI content record for tracking
    await req.payload.create({
      collection: 'ai-content',
      data: {
        title: `AI SEO Analysis - ${doc.title}`,
        type: 'seo_content',
        prompt: {
          userPrompt: `Analyze and optimize SEO for: ${doc.title}`,
          focusKeyword,
        },
        seoOptimization: {
          enabled: true,
          focusKeyword,
          suggestions: suggestions,
        },
        usage: {
          status: 'approved',
          appliedTo: [{
            contentType: req.collection?.config?.slug || 'other',
            contentId: doc.id,
            appliedAt: new Date(),
          }],
        },
        author: req.user?.id,
      },
    })

  } catch (error) {
    console.error('Error in AI SEO optimization hook:', error)
  }

  return doc
}

// Hook to automatically improve content quality
export const aiContentImprovementHook: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  // Only process if AI improvement is requested
  if (!data.aiImprovement?.enabled || operation !== 'update') {
    return data
  }

  try {
    const contentText = extractTextContent(data)
    if (!contentText) {
      return data
    }

    const improvementType = data.aiImprovement.type || 'readability'
    const focusKeyword = data.meta?.focusKeyword || data.seo?.focusKeyword

    // Improve content using AI
    const improvedContent = await improveAIContent(contentText, improvementType, focusKeyword)

    // Update the content with improvements
    if (data.layout && Array.isArray(data.layout)) {
      data.layout = data.layout.map((block: any) => {
        if (block.blockType === 'content' && block.content) {
          return {
            ...block,
            content: improvedContent,
          }
        }
        return block
      })
    }

    // Clear the improvement flag
    data.aiImprovement = {
      ...data.aiImprovement,
      enabled: false,
      lastImproved: new Date(),
    }

    // Log the improvement
    await req.payload.create({
      collection: 'ai-content',
      data: {
        title: `AI Content Improvement - ${data.title}`,
        type: 'content_improvement',
        prompt: {
          userPrompt: `Improve ${improvementType} for: ${data.title}`,
        },
        generatedContent: {
          content: improvedContent,
        },
        usage: {
          status: 'approved',
          appliedTo: [{
            contentType: req.collection?.config?.slug || 'other',
            contentId: data.id,
            appliedAt: new Date(),
          }],
        },
        author: req.user?.id,
      },
    })

  } catch (error) {
    console.error('Error in AI content improvement hook:', error)
  }

  return data
}

// Hook to automatically generate meta descriptions
export const aiMetaGenerationHook: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  // Only generate meta if not provided and content exists
  if (data.meta?.description || !data.title || operation !== 'create') {
    return data
  }

  try {
    const contentText = extractTextContent(data)
    if (!contentText) {
      return data
    }

    // Generate meta description using AI
    const result = await generateAIContent({
      type: 'seo_content',
      userPrompt: `Generate a compelling meta description for this content: ${data.title}\n\nContent: ${contentText.substring(0, 500)}...`,
      systemPrompt: 'Generate only a meta description between 150-160 characters that accurately describes the content and encourages clicks.',
      wordCount: 25,
      temperature: 0.3,
      maxTokens: 100,
    })

    // Update meta description
    data.meta = {
      ...data.meta,
      description: result.content.trim(),
    }

  } catch (error) {
    console.error('Error in AI meta generation hook:', error)
  }

  return data
}

// Hook to automatically translate content
export const aiTranslationHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only process if translation is requested
  if (!doc.translation?.enabled || operation !== 'update') {
    return doc
  }

  try {
    const targetLanguages = doc.translation.languages || []
    if (targetLanguages.length === 0) {
      return doc
    }

    const contentText = extractTextContent(doc)
    if (!contentText) {
      return doc
    }

    // Translate to each target language
    for (const language of targetLanguages) {
      const { translateAIContent } = await import('../../utilities/ai/contentGenerator')
      const translatedContent = await translateAIContent(contentText, language, true)

      // Create translated version
      await req.payload.create({
        collection: req.collection?.config?.slug || 'pages',
        data: {
          ...doc,
          title: `${doc.title} (${language.toUpperCase()})`,
          slug: `${doc.slug}-${language}`,
          content: translatedContent,
          language: language,
          originalId: doc.id,
          status: 'draft', // Translations start as draft
        },
      })

      // Log translation
      await req.payload.create({
        collection: 'ai-content',
        data: {
          title: `AI Translation - ${doc.title} (${language})`,
          type: 'translation',
          prompt: {
            userPrompt: `Translate to ${language}: ${doc.title}`,
            language: language,
          },
          generatedContent: {
            content: translatedContent,
          },
          usage: {
            status: 'approved',
            appliedTo: [{
              contentType: req.collection?.config?.slug || 'other',
              contentId: doc.id,
              appliedAt: new Date(),
            }],
          },
          author: req.user?.id,
        },
      })
    }

  } catch (error) {
    console.error('Error in AI translation hook:', error)
  }

  return doc
}

// Utility function to extract text content from various content structures
function extractTextContent(doc: any): string {
  let content = ''

  // Extract from title
  if (doc.title) {
    content += doc.title + '\n\n'
  }

  // Extract from layout blocks
  if (doc.layout && Array.isArray(doc.layout)) {
    doc.layout.forEach((block: any) => {
      switch (block.blockType) {
        case 'content':
          if (block.content) {
            content += block.content + '\n\n'
          }
          break
        case 'hero':
          if (block.heading) content += block.heading + '\n'
          if (block.subheading) content += block.subheading + '\n'
          if (block.description) content += block.description + '\n\n'
          break
        case 'features':
          if (block.features && Array.isArray(block.features)) {
            block.features.forEach((feature: any) => {
              if (feature.title) content += feature.title + '\n'
              if (feature.description) content += feature.description + '\n'
            })
          }
          break
      }
    })
  }

  // Extract from rich text content
  if (doc.content) {
    content += doc.content + '\n\n'
  }

  // Extract from meta description
  if (doc.meta?.description) {
    content += doc.meta.description + '\n\n'
  }

  return content.trim()
}

