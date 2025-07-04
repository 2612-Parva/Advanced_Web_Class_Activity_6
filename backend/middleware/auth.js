const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info (id, role, etc.) to req

    next(); // Proceed to next middleware or route
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
