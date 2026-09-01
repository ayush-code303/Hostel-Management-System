/**
 * Standardized API Response Helpers
 */

/**
 * Send Success Response
 */
const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    error: null
  });
};

/**
 * Send Error Response
 */
const sendError = (res, message = 'An error occurred', statusCode = 500, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: process.env.NODE_ENV === 'development' ? error : undefined
  });
};

module.exports = {
  sendSuccess,
  sendError
};
