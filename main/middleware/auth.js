module.exports = {
    allowAuthenticated(req, res, next) {
        if (req.isAuthenticated()) return next();
        
        req.flash('error', 'Для продолжения необходимо войти или зарегистрироваться');

        res.status(403).redirect('/auth/login');
    },

    allowUnauthenticated(req, res, next) {
        if (req.isUnauthenticated()) return next();
        
        res.redirect('/books');
    }
};