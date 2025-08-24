import type { Endpoint } from 'payload'
import { analyticsAccess } from '../../access/rbac'

export const analyticsDataEndpoint: Endpoint = {
  path: '/analytics/data',
  method: 'get',
  handler: async (req) => {
    try {
      // Check if user has analytics access
      const hasAccess = await analyticsAccess({ req })
      if (!hasAccess) {
        return new Response('Unauthorized', {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      const { searchParams } = new URL(req.url)
      const type = searchParams.get('type') || 'pageviews'
      const period = searchParams.get('period') || 'daily'
      const startDate = searchParams.get('startDate')
      const endDate = searchParams.get('endDate')
      const contentType = searchParams.get('contentType')
      const contentId = searchParams.get('contentId')

      // Build query conditions
      const conditions: any[] = [
        { type: { equals: type } },
        { period: { equals: period } },
      ]

      if (startDate) {
        conditions.push({ date: { greater_than_equal: new Date(startDate) } })
      }

      if (endDate) {
        conditions.push({ date: { less_than_equal: new Date(endDate) } })
      }

      if (contentType) {
        conditions.push({ contentType: { equals: contentType } })
      }

      if (contentId) {
        conditions.push({ contentId: { equals: contentId } })
      }

      // Fetch analytics data
      const analytics = await req.payload.find({
        collection: 'analytics',
        where: {
          and: conditions,
        },
        sort: 'date',
        limit: 1000,
      })

      // Process data for charts
      const chartData = analytics.docs.map(doc => ({
        date: doc.date,
        value: doc.metrics?.value || 0,
        change: doc.metrics?.change || 0,
        trend: doc.metrics?.trend || 'stable',
      }))

      // Calculate summary statistics
      const values = chartData.map(d => d.value)
      const totalValue = values.reduce((sum, val) => sum + val, 0)
      const avgValue = values.length > 0 ? totalValue / values.length : 0
      const maxValue = Math.max(...values, 0)
      const minValue = Math.min(...values, 0)

      // Calculate period-over-period change
      const currentPeriod = chartData.slice(-7) // Last 7 data points
      const previousPeriod = chartData.slice(-14, -7) // Previous 7 data points
      
      const currentAvg = currentPeriod.length > 0 
        ? currentPeriod.reduce((sum, d) => sum + d.value, 0) / currentPeriod.length 
        : 0
      const previousAvg = previousPeriod.length > 0 
        ? previousPeriod.reduce((sum, d) => sum + d.value, 0) / previousPeriod.length 
        : 0
      
      const periodChange = previousAvg > 0 
        ? ((currentAvg - previousAvg) / previousAvg) * 100 
        : 0

      const response = {
        data: chartData,
        summary: {
          total: totalValue,
          average: Math.round(avgValue * 100) / 100,
          maximum: maxValue,
          minimum: minValue,
          periodChange: Math.round(periodChange * 100) / 100,
          trend: periodChange > 5 ? 'increasing' : periodChange < -5 ? 'decreasing' : 'stable',
        },
        meta: {
          type,
          period,
          startDate,
          endDate,
          count: analytics.docs.length,
        },
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      })
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      return new Response(JSON.stringify({ error: 'Failed to fetch analytics data' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
}

export const seoScoreEndpoint: Endpoint = {
  path: '/seo/score',
  method: 'get',
  handler: async (req) => {
    try {
      const { searchParams } = new URL(req.url)
      const contentType = searchParams.get('contentType')
      const contentId = searchParams.get('contentId')

      if (!contentType || !contentId) {
        return new Response(JSON.stringify({ error: 'contentType and contentId are required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      // Fetch SEO data
      const seoData = await req.payload.find({
        collection: 'seo',
        where: {
          and: [
            { contentType: { equals: contentType } },
            { contentId: { equals: contentId } },
          ],
        },
        limit: 1,
      })

      if (seoData.docs.length === 0) {
        return new Response(JSON.stringify({ error: 'SEO data not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      const seo = seoData.docs[0]
      const analysis = seo.analysis || {}

      const response = {
        seoScore: analysis.seoScore || 0,
        readabilityScore: analysis.readabilityScore || 0,
        issues: analysis.issues || [],
        lastAnalyzed: analysis.lastAnalyzed,
        recommendations: analysis.issues
          ?.filter((issue: any) => issue.suggestion)
          .map((issue: any) => issue.suggestion) || [],
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
        },
      })
    } catch (error) {
      console.error('Error fetching SEO score:', error)
      return new Response(JSON.stringify({ error: 'Failed to fetch SEO score' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
}

