import type { Access, PayloadRequest } from 'payload'

// Helper function to get user role and permissions
export const getUserRole = async (req: PayloadRequest) => {
  if (!req.user) return null
  
  try {
    const user = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
      depth: 2, // Include role and department data
    })
    
    return user.role
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}

// Check if user has specific permission level for a collection
export const hasCollectionPermission = async (
  req: PayloadRequest,
  collection: string,
  requiredLevel: 'read' | 'create' | 'full'
): Promise<boolean> => {
  const role = await getUserRole(req)
  if (!role || !role.isActive) return false
  
  const collectionPermission = role.permissions?.collections?.[collection]
  
  switch (requiredLevel) {
    case 'read':
      return ['read', 'create', 'full'].includes(collectionPermission)
    case 'create':
      return ['create', 'full'].includes(collectionPermission)
    case 'full':
      return collectionPermission === 'full'
    default:
      return false
  }
}

// Check if user has specific feature permission
export const hasFeaturePermission = async (
  req: PayloadRequest,
  feature: string
): Promise<boolean> => {
  const role = await getUserRole(req)
  if (!role || !role.isActive) return false
  
  return role.permissions?.features?.[feature] === true
}

// Admin access - only for users with admin role or high-level permissions
export const adminAccess: Access = async ({ req }) => {
  if (!req.user) return false
  
  const role = await getUserRole(req)
  return role && role.level >= 8 && role.isActive
}

// Editor access - for content creators and editors
export const editorAccess: Access = async ({ req }) => {
  if (!req.user) return false
  
  const role = await getUserRole(req)
  return role && role.level >= 5 && role.isActive
}

// Contributor access - for basic content contributors
export const contributorAccess: Access = async ({ req }) => {
  if (!req.user) return false
  
  const role = await getUserRole(req)
  return role && role.level >= 3 && role.isActive
}

// Own resource access - users can only access their own resources
export const ownResourceAccess: Access = async ({ req, id }) => {
  if (!req.user) return false
  
  // Admin can access all
  if (await adminAccess({ req })) return true
  
  // Users can only access their own resources
  return req.user.id === id
}

// Department access - users can access resources from their department
export const departmentAccess: Access = async ({ req, data }) => {
  if (!req.user) return false
  
  // Admin can access all
  if (await adminAccess({ req })) return true
  
  try {
    const user = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
      depth: 1,
    })
    
    // If no department restriction, allow access
    if (!data?.department && !user.department) return true
    
    // Check if user is in the same department
    return user.department?.id === data?.department?.id
  } catch (error) {
    console.error('Error checking department access:', error)
    return false
  }
}

// Collection-specific access functions
export const pagesAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'pages', 'read')
}

export const postsAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'posts', 'read')
}

export const mediaAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'media', 'read')
}

export const usersAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'users', 'read')
}

// Create access functions
export const createPagesAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'pages', 'create')
}

export const createPostsAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'posts', 'create')
}

export const createMediaAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'media', 'create')
}

export const createUsersAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'users', 'create')
}

// Update access functions
export const updatePagesAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'pages', 'full')
}

export const updatePostsAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'posts', 'full')
}

export const updateUsersAccess: Access = async ({ req, id }) => {
  // Users can update their own profile
  if (req.user?.id === id) return true
  
  // Otherwise need full user management permission
  return await hasCollectionPermission(req, 'users', 'full')
}

// Delete access functions
export const deletePagesAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'pages', 'full')
}

export const deletePostsAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'posts', 'full')
}

export const deleteUsersAccess: Access = async ({ req }) => {
  return await hasCollectionPermission(req, 'users', 'full')
}

// Publish access - only users with publish permission
export const publishAccess: Access = async ({ req }) => {
  return await hasFeaturePermission(req, 'canPublish')
}

// Approve access - only users with approval permission
export const approveAccess: Access = async ({ req }) => {
  return await hasFeaturePermission(req, 'canApprove')
}

// Analytics access - only users with analytics permission
export const analyticsAccess: Access = async ({ req }) => {
  return await hasFeaturePermission(req, 'canAccessAnalytics')
}

// Settings access - only users with settings permission
export const settingsAccess: Access = async ({ req }) => {
  return await hasFeaturePermission(req, 'canManageSettings')
}

