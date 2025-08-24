import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'

// Hook to handle content scheduling
export const scheduleContentHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only process if this is a scheduled content item
  if (doc.status !== 'scheduled' || !doc.publishDate) {
    return doc
  }

  const publishDate = new Date(doc.publishDate)
  const now = new Date()

  // If publish date is in the past, publish immediately
  if (publishDate <= now) {
    try {
      await req.payload.update({
        collection: req.collection?.config?.slug || '',
        id: doc.id,
        data: {
          status: 'published',
          publishedAt: now,
        },
      })
    } catch (error) {
      console.error('Error auto-publishing scheduled content:', error)
    }
  }

  return doc
}

// Hook to create workflow entry when content is created/updated
export const createWorkflowHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Skip if this is already a workflow item
  if (req.collection?.config?.slug === 'content-workflow') {
    return doc
  }

  try {
    // Check if workflow already exists for this content
    const existingWorkflow = await req.payload.find({
      collection: 'content-workflow',
      where: {
        contentId: { equals: doc.id },
      },
      limit: 1,
    })

    if (existingWorkflow.docs.length === 0) {
      // Create new workflow entry
      await req.payload.create({
        collection: 'content-workflow',
        data: {
          title: doc.title || doc.name || `${req.collection?.config?.slug} - ${doc.id}`,
          contentType: req.collection?.config?.slug || 'other',
          contentId: doc.id,
          status: doc.status || 'draft',
          author: req.user?.id,
          assignedTo: req.user?.id,
          isActive: true,
        },
      })
    } else {
      // Update existing workflow
      await req.payload.update({
        collection: 'content-workflow',
        id: existingWorkflow.docs[0].id,
        data: {
          status: doc.status || 'draft',
          title: doc.title || doc.name || existingWorkflow.docs[0].title,
        },
      })
    }
  } catch (error) {
    console.error('Error managing workflow:', error)
  }

  return doc
}

// Hook to create version snapshot when content changes
export const createVersionHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  // Skip version creation for workflow and version collections
  if (['content-workflow', 'content-versions'].includes(req.collection?.config?.slug || '')) {
    return doc
  }

  // Only create versions for updates, not creates
  if (operation !== 'update' || !previousDoc) {
    return doc
  }

  try {
    // Get the current version number
    const existingVersions = await req.payload.find({
      collection: 'content-versions',
      where: {
        contentId: { equals: doc.id },
      },
      sort: '-version',
      limit: 1,
    })

    // Calculate next version number
    let nextVersion = '1.0'
    if (existingVersions.docs.length > 0) {
      const lastVersion = existingVersions.docs[0].version
      const versionParts = lastVersion.split('.')
      const major = parseInt(versionParts[0] || '1')
      const minor = parseInt(versionParts[1] || '0')
      nextVersion = `${major}.${minor + 1}`
    }

    // Detect changes
    const changes = []
    for (const [key, value] of Object.entries(doc)) {
      if (key === 'updatedAt' || key === 'createdAt') continue
      
      const oldValue = previousDoc[key]
      if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
        changes.push({
          field: key,
          changeType: oldValue === undefined ? 'added' : 'modified',
          oldValue: typeof oldValue === 'object' ? JSON.stringify(oldValue) : String(oldValue || ''),
          newValue: typeof value === 'object' ? JSON.stringify(value) : String(value || ''),
        })
      }
    }

    // Create version record
    await req.payload.create({
      collection: 'content-versions',
      data: {
        title: `${doc.title || doc.name} - v${nextVersion}`,
        contentType: req.collection?.config?.slug || 'other',
        contentId: doc.id,
        version: nextVersion,
        versionType: 'minor',
        author: req.user?.id,
        contentSnapshot: doc,
        changes,
        changeLog: `Updated ${changes.length} field(s)`,
        status: doc.status || 'draft',
        isCurrentVersion: true,
      },
    })

    // Mark previous versions as not current
    if (existingVersions.docs.length > 0) {
      await req.payload.update({
        collection: 'content-versions',
        where: {
          and: [
            { contentId: { equals: doc.id } },
            { version: { not_equals: nextVersion } },
          ],
        },
        data: {
          isCurrentVersion: false,
        },
      })
    }
  } catch (error) {
    console.error('Error creating version:', error)
  }

  return doc
}

// Hook to validate workflow permissions
export const validateWorkflowPermissions: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  // Skip validation for creates
  if (operation === 'create') {
    return data
  }

  // Check if user can change status
  if (data.status && data.status !== 'draft') {
    const userRole = await req.payload.findByID({
      collection: 'users',
      id: req.user?.id || '',
      depth: 2,
    })

    const role = userRole.role

    // Check permissions based on status change
    switch (data.status) {
      case 'published':
        if (!role?.permissions?.features?.canPublish) {
          throw new Error('You do not have permission to publish content')
        }
        break
      case 'approved':
        if (!role?.permissions?.features?.canApprove) {
          throw new Error('You do not have permission to approve content')
        }
        break
    }
  }

  return data
}

