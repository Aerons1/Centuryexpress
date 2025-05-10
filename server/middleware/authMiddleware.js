const jwt = require('jsonwebtoken');

// Protect middleware: Authenticated users only
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: 'Token verification failed, authorization denied' });
      }

      req.user = decoded; // { id, isAdmin }
      next();
    });
  } catch (error) {
    res.status(500).json({ msg: 'Authorization middleware error' });
  }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ msg: 'Admin access only' });
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: 'Admin authorization error' });
  }
};

module.exports = { protect, adminOnly };
