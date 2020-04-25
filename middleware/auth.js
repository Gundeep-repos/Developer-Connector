const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from the header
  const token = req.header('x-auth-token');
  //check if no token came
  if (!token) {
    return res.status(401).json({ msg: 'No token,Authorization denied' });
  }
  // if token comes
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
