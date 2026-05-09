module.exports = {
  // User Roles
  ROLES: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    GUEST: 'guest'
  },

  // Role Permissions
  PERMISSIONS: {
    admin: ['create', 'read', 'update', 'delete', 'manage_users'],
    manager: ['create', 'read', 'update', 'manage_own_items'],
    user: ['create', 'read', 'update_own'],
    guest: ['read']
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
  }
};
