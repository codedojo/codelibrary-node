module.exports = {
    allowAuthenticated(req, res, next) {
        if (req.isAuthenticated()) return next();
        
        res.status(403).redirect('/auth/login');
    },

    allowUnauthenticated(req, res, next) {
        if (req.isUnauthenticated()) return next();
        
        res.redirect('/books');
    }
};