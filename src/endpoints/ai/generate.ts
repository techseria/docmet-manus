import type { Endpoint } from 'payload'
import { generateAIContent, improveAIContent, translateAIContent } from '../../utilities/ai/contentGenerator'
import { editorAccess } from '../../access/rbac'

export const generateContentEndpoint: Endpoint = {
  path: '/ai/generate',
  method: 'post',
  handler: async (req) => {
    try {
      // Check if user has editor access
      const hasAccess = await editorAccess({ req })
      if (!hasAccess) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const body = await req.json()
      const {
        type,
        userPrompt,
        systemPrompt,
        keywords,
        tone,
        targetAudience,
        wordCount,
        language,
        focusKeyword,
        model,
        temperature,
        maxTokens,
        topP,
        saveToCollection = true,
      } = body

      if (!type || !userPrompt) {
        return new Response(JSON.stringify({ error: 'Type and userPrompt are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // Generate content
      const result = await generateAIContent({
        type,
        userPrompt,
        systemPrompt,
        keywords,
        tone,
        targetAudience,
        wordCount,
        language,
        focusKeyword,
        model,
        temperature,
        maxTokens,
        topP,
      })

      // Save to AI Content collection if requested
      let aiContentRecord = null
      if (saveToCollection) {
        try {
          aiContentRecord = await req.payload.create({
            collection: 'ai-content',
            data: {
              title: `AI Generated ${type.replace('_', ' ')} - ${new Date().toLocaleDateString()}`,
              type,
              prompt: {
                userPrompt,
                systemPrompt,
                keywords: keywords?.map((k: string) => ({ keyword: k })) || [],
                tone,
                targetAudience,
                wordCount,
                language,
              },
              aiSettings: {
                model: model || 'gpt-4',
                temperature: temperature || 0.7,
                maxTokens: maxTokens || 2000,
                topP: topP || 1,
              },
              generatedContent: {
                content: result.content,
                rawContent: result.content,
              },
              seoOptimization: {
                enabled: !!focusKeyword,
                focusKeyword,
                metaTitle: result.metaTitle,
                metaDescription: result.metaDescription,
                suggestions: result.seoSuggestions || [],
              },
              quality: {
                score: result.qualityScore,
                readabilityScore: result.readabilityScore,
              },
              costs: {
                tokensUsed: result.tokensUsed,
                estimatedCost: result.estimatedCost,
                requestCount: 1,
              },
              author: req.user?.id,
              usage: {
                status: 'draft',
                regenerationCount: 0,
              },
            },
          })
        } catch (error) {
          console.error('Error saving AI content to collection:', error)
        }
      }

      return new Response(JSON.stringify({
        success: true,
        data: result,
        aiContentId: aiContentRecord?.id,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error generating AI content:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to generate content',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}

export const improveContentEndpoint: Endpoint = {
  path: '/ai/improve',
  method: 'post',
  handler: async (req) => {
    try {
      const hasAccess = await editorAccess({ req })
      if (!hasAccess) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const body = await req.json()
      const { content, improvementType, focusKeyword, aiContentId } = body

      if (!content || !improvementType) {
        return new Response(JSON.stringify({ error: 'Content and improvementType are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const improvedContent = await improveAIContent(content, improvementType, focusKeyword)

      // Update AI Content record if provided
      if (aiContentId) {
        try {
          await req.payload.update({
            collection: 'ai-content',
            id: aiContentId,
            data: {
              generatedContent: {
                content: improvedContent,
                rawContent: improvedContent,
              },
              usage: {
                regenerationCount: 1, // This would be incremented properly
              },
            },
          })
        } catch (error) {
          console.error('Error updating AI content record:', error)
        }
      }

      return new Response(JSON.stringify({
        success: true,
        improvedContent,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error improving content:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to improve content',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}

export const translateContentEndpoint: Endpoint = {
  path: '/ai/translate',
  method: 'post',
  handler: async (req) => {
    try {
      const hasAccess = await editorAccess({ req })
      if (!hasAccess) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const body = await req.json()
      const { content, targetLanguage, preserveFormatting = true } = body

      if (!content || !targetLanguage) {
        return new Response(JSON.stringify({ error: 'Content and targetLanguage are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const translatedContent = await translateAIContent(content, targetLanguage, preserveFormatting)

      return new Response(JSON.stringify({
        success: true,
        translatedContent,
        targetLanguage,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error translating content:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to translate content',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}

export const seoSuggestionsEndpoint: Endpoint = {
  path: '/ai/seo-suggestions',
  method: 'post',
  handler: async (req) => {
    try {
      const hasAccess = await editorAccess({ req })
      if (!hasAccess) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const body = await req.json()
      const { content, focusKeyword, currentTitle, currentDescription } = body

      if (!content || !focusKeyword) {
        return new Response(JSON.stringify({ error: 'Content and focusKeyword are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const { AIContentGenerator } = await import('../../utilities/ai/contentGenerator')
      const generator = new AIContentGenerator()
      const suggestions = await generator.generateSEOSuggestions(
        content,
        focusKeyword,
        currentTitle,
        currentDescription
      )

      return new Response(JSON.stringify({
        success: true,
        suggestions,
        focusKeyword,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error generating SEO suggestions:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to generate SEO suggestions',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}

