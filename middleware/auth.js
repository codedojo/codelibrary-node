const { user: User } = require('../models');

module.exports = {
    findUser(req, res, next) {
        if (req.session) {
            User.findById(req.session.userId)
                .then(user => {
                    req.user = user;
                    res.locals.user = user;

                    next();
                })
                .catch();
        } else {
            next();
        }
    },

    authenticated(req, res, next) {
        if (req.user) return next();
        
        res.status(403).redirect('/auth/login');
    },

    unauthenticated(req, res, next) {
        if (!req.user) return next();
        
        res.redirect('/books');
    }
};