import type { PayloadRequest } from 'payload'

export interface FormSubmissionData {
  [key: string]: any
}

export interface LeadScoringRule {
  field: string
  condition: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'is_filled'
  value?: string
  score: number
}

export interface ProcessingResult {
  leadScore: number
  qualified: boolean
  leadId?: string
  errors: Array<{
    type: string
    message: string
  }>
  notifications: {
    emailSent: boolean
    webhookSent: boolean
    crmSynced: boolean
  }
}

export class FormProcessor {
  private req: PayloadRequest

  constructor(req: PayloadRequest) {
    this.req = req
  }

  public async processSubmission(
    formId: string,
    submissionData: FormSubmissionData,
    submissionId: string
  ): Promise<ProcessingResult> {
    const result: ProcessingResult = {
      leadScore: 0,
      qualified: false,
      errors: [],
      notifications: {
        emailSent: false,
        webhookSent: false,
        crmSynced: false,
      },
    }

    try {
      // Get form configuration
      const form = await this.req.payload.findByID({
        collection: 'form-builder',
        id: formId,
      })

      if (!form) {
        throw new Error('Form not found')
      }

      // Calculate lead score
      if (form.leadScoring?.enabled && form.leadScoring.scoringRules) {
        result.leadScore = this.calculateLeadScore(
          submissionData,
          form.leadScoring.scoringRules
        )
        result.qualified = result.leadScore >= (form.leadScoring.qualificationThreshold || 50)
      }

      // Create or update lead
      if (result.qualified || form.type === 'lead_generation') {
        try {
          result.leadId = await this.createOrUpdateLead(submissionData, form, result.leadScore)
        } catch (error) {
          result.errors.push({
            type: 'lead',
            message: `Failed to create lead: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
        }
      }

      // Send notifications
      if (form.notifications?.emailNotifications) {
        try {
          await this.sendEmailNotifications(form, submissionData, submissionId)
          result.notifications.emailSent = true
        } catch (error) {
          result.errors.push({
            type: 'email',
            message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
        }
      }

      // Send webhook
      if (form.notifications?.webhookUrl) {
        try {
          await this.sendWebhook(form.notifications.webhookUrl, submissionData, form)
          result.notifications.webhookSent = true
        } catch (error) {
          result.errors.push({
            type: 'webhook',
            message: `Failed to send webhook: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
        }
      }

      // Sync with CRM
      if (form.integrations?.crm?.enabled && result.leadId) {
        try {
          await this.syncWithCRM(form.integrations.crm, submissionData, result.leadId)
          result.notifications.crmSynced = true
        } catch (error) {
          result.errors.push({
            type: 'crm',
            message: `Failed to sync with CRM: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
        }
      }

      // Update form analytics
      await this.updateFormAnalytics(formId, result.qualified)

    } catch (error) {
      result.errors.push({
        type: 'processing',
        message: `Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }

    return result
  }

  private calculateLeadScore(
    submissionData: FormSubmissionData,
    scoringRules: LeadScoringRule[]
  ): number {
    let totalScore = 0

    for (const rule of scoringRules) {
      const fieldValue = submissionData[rule.field]
      let ruleMatches = false

      switch (rule.condition) {
        case 'equals':
          ruleMatches = fieldValue === rule.value
          break
        case 'contains':
          ruleMatches = typeof fieldValue === 'string' && 
                       fieldValue.toLowerCase().includes((rule.value || '').toLowerCase())
          break
        case 'greater_than':
          ruleMatches = Number(fieldValue) > Number(rule.value)
          break
        case 'less_than':
          ruleMatches = Number(fieldValue) < Number(rule.value)
          break
        case 'is_filled':
          ruleMatches = fieldValue !== undefined && fieldValue !== null && fieldValue !== ''
          break
      }

      if (ruleMatches) {
        totalScore += rule.score
      }
    }

    return Math.max(0, Math.min(100, totalScore))
  }

  private async createOrUpdateLead(
    submissionData: FormSubmissionData,
    form: any,
    leadScore: number
  ): Promise<string> {
    const email = submissionData.email || submissionData.Email || submissionData.emailAddress

    if (!email) {
      throw new Error('Email is required to create a lead')
    }

    // Check if lead already exists
    const existingLeads = await this.req.payload.find({
      collection: 'leads',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    const leadData = {
      email,
      name: submissionData.name || submissionData.Name || 
            `${submissionData.firstName || ''} ${submissionData.lastName || ''}`.trim(),
      firstName: submissionData.firstName || submissionData.first_name,
      lastName: submissionData.lastName || submissionData.last_name,
      phone: submissionData.phone || submissionData.Phone,
      company: {
        name: submissionData.company || submissionData.companyName,
        website: submissionData.website || submissionData.companyWebsite,
        industry: submissionData.industry,
        size: submissionData.companySize,
      },
      jobTitle: submissionData.jobTitle || submissionData.position,
      source: {
        type: 'contact_form',
        form: form.id,
        campaign: submissionData.utm_campaign,
        medium: submissionData.utm_medium,
        utmParameters: {
          source: submissionData.utm_source,
          medium: submissionData.utm_medium,
          campaign: submissionData.utm_campaign,
          term: submissionData.utm_term,
          content: submissionData.utm_content,
        },
      },
      scoring: {
        score: leadScore,
        grade: this.getLeadGrade(leadScore),
        qualification: {
          budget: submissionData.budget,
          authority: submissionData.authority,
          need: submissionData.need,
          timeline: submissionData.timeline,
        },
      },
      customFields: this.extractCustomFields(submissionData, form.fields),
      tags: submissionData.tags ? submissionData.tags.split(',').map((t: string) => ({ tag: t.trim() })) : [],
    }

    if (existingLeads.docs.length > 0) {
      // Update existing lead
      const existingLead = existingLeads.docs[0]
      
      // Add to scoring history
      const scoringHistory = existingLead.scoring?.scoringHistory || []
      scoringHistory.push({
        date: new Date(),
        previousScore: existingLead.scoring?.score || 0,
        newScore: leadScore,
        reason: 'Form submission',
        action: `Form: ${form.name}`,
      })

      await this.req.payload.update({
        collection: 'leads',
        id: existingLead.id,
        data: {
          ...leadData,
          scoring: {
            ...leadData.scoring,
            scoringHistory,
          },
          activities: [
            ...(existingLead.activities || []),
            {
              type: 'note',
              subject: `Form submission: ${form.name}`,
              description: `New form submission received with score: ${leadScore}`,
              date: new Date(),
              outcome: 'successful',
            },
          ],
        },
      })

      return existingLead.id
    } else {
      // Create new lead
      const newLead = await this.req.payload.create({
        collection: 'leads',
        data: {
          ...leadData,
          status: 'new',
          activities: [
            {
              type: 'note',
              subject: `Initial form submission: ${form.name}`,
              description: `Lead created from form submission with score: ${leadScore}`,
              date: new Date(),
              outcome: 'successful',
            },
          ],
        },
      })

      return newLead.id
    }
  }

  private getLeadGrade(score: number): string {
    if (score >= 80) return 'hot'
    if (score >= 60) return 'warm'
    if (score >= 40) return 'cold'
    if (score >= 20) return 'qualified'
    return 'unqualified'
  }

  private extractCustomFields(submissionData: FormSubmissionData, formFields: any[]): any[] {
    const customFields: any[] = []
    const standardFields = ['email', 'name', 'firstName', 'lastName', 'phone', 'company', 'jobTitle', 'website']

    for (const [key, value] of Object.entries(submissionData)) {
      if (!standardFields.includes(key) && !key.startsWith('utm_')) {
        const formField = formFields.find(f => f.id === key)
        customFields.push({
          name: formField?.label || key,
          value: String(value),
          type: this.getFieldType(value),
        })
      }
    }

    return customFields
  }

  private getFieldType(value: any): string {
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'
    if (value instanceof Date) return 'date'
    if (typeof value === 'string' && value.match(/^https?:\/\//)) return 'url'
    return 'text'
  }

  private async sendEmailNotifications(
    form: any,
    submissionData: FormSubmissionData,
    submissionId: string
  ): Promise<void> {
    const notificationEmails = form.notifications?.notificationEmails || []

    for (const notification of notificationEmails) {
      // This would integrate with your email service
      console.log(`Sending notification to ${notification.email} for submission ${submissionId}`)
      
      // Example email content
      const emailContent = {
        to: notification.email,
        subject: `New ${form.name} submission`,
        html: this.generateNotificationEmail(form, submissionData, submissionId),
      }

      // Send email using your preferred email service
      // await emailService.send(emailContent)
    }

    // Send auto-responder if enabled
    if (form.notifications?.autoResponder?.enabled && submissionData.email) {
      const autoResponder = {
        to: submissionData.email,
        subject: form.notifications.autoResponder.subject || 'Thank you for your submission',
        html: form.notifications.autoResponder.message || 'Thank you for contacting us. We will get back to you soon.',
      }

      // await emailService.send(autoResponder)
    }
  }

  private generateNotificationEmail(
    form: any,
    submissionData: FormSubmissionData,
    submissionId: string
  ): string {
    let html = `
      <h2>New ${form.name} Submission</h2>
      <p><strong>Submission ID:</strong> ${submissionId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <h3>Submission Details:</h3>
      <table style="border-collapse: collapse; width: 100%;">
    `

    for (const [key, value] of Object.entries(submissionData)) {
      html += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${key}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
        </tr>
      `
    }

    html += `
      </table>
      <hr>
      <p><a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/collections/form-submissions/${submissionId}">View in Admin</a></p>
    `

    return html
  }

  private async sendWebhook(
    webhookUrl: string,
    submissionData: FormSubmissionData,
    form: any
  ): Promise<void> {
    const payload = {
      event: 'form_submission',
      form: {
        id: form.id,
        name: form.name,
        type: form.type,
      },
      submission: submissionData,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Payload-CMS-Webhook/1.0',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`)
    }
  }

  private async syncWithCRM(
    crmConfig: any,
    submissionData: FormSubmissionData,
    leadId: string
  ): Promise<void> {
    switch (crmConfig.provider) {
      case 'salesforce':
        await this.syncWithSalesforce(crmConfig, submissionData, leadId)
        break
      case 'hubspot':
        await this.syncWithHubSpot(crmConfig, submissionData, leadId)
        break
      case 'pipedrive':
        await this.syncWithPipedrive(crmConfig, submissionData, leadId)
        break
      case 'custom':
        await this.syncWithCustomAPI(crmConfig, submissionData, leadId)
        break
      default:
        throw new Error(`Unsupported CRM provider: ${crmConfig.provider}`)
    }
  }

  private async syncWithSalesforce(
    config: any,
    submissionData: FormSubmissionData,
    leadId: string
  ): Promise<void> {
    // Salesforce integration implementation
    console.log('Syncing with Salesforce:', leadId)
    // This would use the Salesforce API to create/update leads
  }

  private async syncWithHubSpot(
    config: any,
    submissionData: FormSubmissionData,
    leadId: string
  ): Promise<void> {
    // HubSpot integration implementation
    console.log('Syncing with HubSpot:', leadId)
    // This would use the HubSpot API to create/update contacts
  }

  private async syncWithPipedrive(
    config: any,
    submissionData: FormSubmissionData,
    leadId: string
  ): Promise<void> {
    // Pipedrive integration implementation
    console.log('Syncing with Pipedrive:', leadId)
    // This would use the Pipedrive API to create/update persons
  }

  private async syncWithCustomAPI(
    config: any,
    submissionData: FormSubmissionData,
    leadId: string
  ): Promise<void> {
    // Custom API integration implementation
    console.log('Syncing with custom API:', leadId)
    
    const mappedData: any = {}
    
    // Apply field mapping
    if (config.fieldMapping && Array.isArray(config.fieldMapping)) {
      for (const mapping of config.fieldMapping) {
        if (submissionData[mapping.formField]) {
          mappedData[mapping.crmField] = submissionData[mapping.formField]
        }
      }
    }

    // Send to custom API
    const response = await fetch(config.apiUrl || config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        leadId,
        data: mappedData,
        originalData: submissionData,
      }),
    })

    if (!response.ok) {
      throw new Error(`Custom API sync failed with status ${response.status}`)
    }
  }

  private async updateFormAnalytics(formId: string, qualified: boolean): Promise<void> {
    try {
      const form = await this.req.payload.findByID({
        collection: 'form-builder',
        id: formId,
      })

      const currentSubmissions = form.analytics?.submissions || 0
      const currentViews = form.analytics?.views || 0

      await this.req.payload.update({
        collection: 'form-builder',
        id: formId,
        data: {
          analytics: {
            ...form.analytics,
            submissions: currentSubmissions + 1,
            conversionRate: currentViews > 0 ? ((currentSubmissions + 1) / currentViews) * 100 : 0,
            lastSubmission: new Date(),
          },
        },
      })
    } catch (error) {
      console.error('Failed to update form analytics:', error)
    }
  }
}

// Utility function to process form submissions
export async function processFormSubmission(
  req: PayloadRequest,
  formId: string,
  submissionData: FormSubmissionData,
  submissionId: string
): Promise<ProcessingResult> {
  const processor = new FormProcessor(req)
  return await processor.processSubmission(formId, submissionData, submissionId)
}

// Spam detection utilities
export function detectSpam(submissionData: FormSubmissionData, metadata: any): {
  isSpam: boolean
  score: number
  reasons: Array<{ reason: string; details?: string }>
} {
  const reasons: Array<{ reason: string; details?: string }> = []
  let spamScore = 0

  // Check for honeypot
  if (submissionData.honeypot || submissionData._honeypot) {
    reasons.push({ reason: 'honeypot', details: 'Honeypot field was filled' })
    spamScore += 100
  }

  // Check submission time (too fast)
  if (metadata.submissionTime && metadata.submissionTime < 3) {
    reasons.push({ reason: 'too_fast', details: `Submitted in ${metadata.submissionTime} seconds` })
    spamScore += 50
  }

  // Check for spam keywords
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here']
  const allText = Object.values(submissionData).join(' ').toLowerCase()
  
  for (const keyword of spamKeywords) {
    if (allText.includes(keyword)) {
      reasons.push({ reason: 'spam_keywords', details: `Contains keyword: ${keyword}` })
      spamScore += 25
    }
  }

  // Check for suspicious patterns
  const email = submissionData.email || submissionData.Email
  if (email && email.includes('+')) {
    spamScore += 10
  }

  // Check for duplicate submissions (this would require database lookup)
  // This is a simplified check
  if (submissionData.email && submissionData.name === submissionData.email) {
    reasons.push({ reason: 'suspicious_pattern', details: 'Name matches email' })
    spamScore += 30
  }

  return {
    isSpam: spamScore >= 50,
    score: Math.min(100, spamScore),
    reasons,
  }
}

