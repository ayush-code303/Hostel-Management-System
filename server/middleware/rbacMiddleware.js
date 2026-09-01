const { sendError } = require('../utils/response');

/**
 * Role-Based Access Control (RBAC) Authorization Middleware
 * Usage: authorize('admin', 'warden')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required before checking permissions.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `Forbidden: Role '${req.user.role}' is not authorized to access this resource. Required: [${roles.join(', ')}]`,
        403
      );
    }

    next();
  };
};

module.exports = { authorize };
