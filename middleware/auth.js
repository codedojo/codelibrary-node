module.exports = {
    authenticated(req, res, next) {
        if (req.user) return next();
        
        res.status(403).redirect('/auth/login');
    },

    unauthenticated(req, res, next) {
        if (!req.user) return next();
        
        res.redirect('/books');
    }
};