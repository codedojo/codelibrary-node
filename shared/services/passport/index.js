const passport = require('passport');

const { User } = require('../../models');
require('./local');
require('./github');
require('./jwt');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId, done);
});

module.exports = passport;