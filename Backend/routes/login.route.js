const express = require('express');
const passport = require('../password');
const { generateToken } = require('../jwt_auth');
const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Wrong username or password.' });
    res.json({ token: generateToken({ id: user.id, username: user.username, role: user.role }) });
  })(req, res, next);
});

module.exports = router;