const jwt = require('jsonwebtoken');
const { ErrorHandler, asyncHandler } = require('../utils/errorHandler');
const { ROLES, PERMISSIONS } = require('../config/constants');

// In-memory user storage (for demo purposes)
const users = new Map();

// Verify JWT Token
const verifyToken = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ErrorHandler('Access token required', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ErrorHandler('Invalid or expired token', 401);
  }
});

// Authorization middleware - Check if user has specific permission
const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    const userPermissions = PERMISSIONS[userRole] || [];

    const hasPermission = requiredPermissions.some(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Insufficient permissions',
        requiredPermissions,
        userPermissions
      });
    }

    next();
  };
};

// Restrict to specific roles
const restrictToRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Insufficient role',
        requiredRoles: roles,
        userRole: req.user?.role
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  authorize,
  restrictToRole,
  users
};
