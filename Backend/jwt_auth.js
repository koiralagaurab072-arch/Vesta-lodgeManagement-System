
const jwt = require('jsonwebtoken');

const jwtauth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Please log in.' });
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
};

const generateToken = (userdata) =>
  jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: '12h' });

module.exports = { jwtauth, generateToken };