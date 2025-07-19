const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get token from the request header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ msg: 'No authentication token, authorization denied.' });
    }

    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
    }

    // Attach the user's ID from the token payload to the request object
    req.user = verified.id;

    // Move to the next step in the route's execution
    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;