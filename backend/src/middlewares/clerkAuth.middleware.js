const { verifyToken } = require('@clerk/clerk-sdk-node');

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token using Clerk's SDK
    const session = await verifyToken(token, {
      secretKey: 'sk_test_tpeVMob3gQ7Y1j1AgDdv8M0fZFBw2z73uVTscD42H6',
    });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user information to the request object
    req.user = session.claims; // Or session.user if you need user details

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = isAuthenticated;
