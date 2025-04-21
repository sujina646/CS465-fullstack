const passport = require('passport');

// Authentication middleware
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Add user to request
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth; 