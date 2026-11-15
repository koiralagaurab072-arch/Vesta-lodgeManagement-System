const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const pepper = (plain) => plain + process.env.PEPPER_STR;
const adminHash = bcrypt.hashSync(pepper(process.env.ADMIN_PASSWORD), 10);

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const okUser = username === process.env.ADMIN_USER;
    const okPass = await bcrypt.compare(pepper(String(password)), adminHash);
    if (okUser && okPass) return done(null, { id: 1, username, role: 'admin' });
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;