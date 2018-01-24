const { passport } = require('../services');

module.exports = {
    github: {
        authenticate: passport.authenticate('github'),
        callback: passport.authenticate('github', {
            failureRedirect: '/auth/login',
            successRedirect: '/profile'
        })
    }
};