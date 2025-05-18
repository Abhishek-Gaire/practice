const jwt = require('jsonwebtoken');

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return next(new Error('Access denied. No token provided.'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new Error('Invalid token.'));
    req.user = user;
    next();
  });
};

// Middleware for Authorization
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return next(new Error('Access denied. Insufficient permissions.'));
  }
  next();
};

module.exports = {
  authorizeRole,
  authenticateToken
}