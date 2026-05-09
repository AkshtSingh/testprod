class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Invalid JWT
  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid Token';
    err.statusCode = 401;
  }

  // JWT Expired
  if (err.name === 'TokenExpiredError') {
    err.message = 'Token Expired';
    err.statusCode = 401;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode
  });
};

module.exports = { ErrorHandler, asyncHandler, errorMiddleware };
