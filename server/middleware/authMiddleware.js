const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

/**
 * Protect Routes - Verify JWT Authentication Token
 */
const protect = async (req, res, next) => {
  let token;

  // Read Token from Authorization Header: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Access denied. Authorization token missing.', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret_key');

    // Attach User to Request object
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return sendError(res, 'User account associated with token no longer exists.', 401);
    }

    if (!req.user.isActive) {
      return sendError(res, 'User account has been deactivated.', 403);
    }

    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired authorization token.', 401, error.message);
  }
};

module.exports = { protect };
