const jwt = require('jsonwebtoken');
// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Access denied. No token provided.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({error: 'Invalid token.'});
    }
    req.user = user;
    next();
  });
};

// Middleware for Authorization
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({error: 'Access denied. Insufficient permissions.'});
  }
  next();
};

module.exports = {authenticateToken, authorizeRole};