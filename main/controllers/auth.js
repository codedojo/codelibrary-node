const { passport } = require('../../shared/services');

module.exports = {
    // GET /auth/register
    showRegisterPage(req, res) {
        res.render('auth/register', {
            id: 'register',
            className: 'auth-page',
            title: 'Регистрация'
        });
    },

    // GET /auth/login
    showLoginPage(req, res) {
        res.render('auth/login', {
            id: 'login',
            className: 'auth-page',
            title: 'Вход'
        });
    },

    // POST /auth/register
    register: passport.authenticate('local-register', {
        failureRedirect: '/auth/register',
        successRedirect: '/user'
    }),

    // POST /auth/login
    login: passport.authenticate('local-login', {
        failureRedirect: '/auth/login',
        successRedirect: '/user'
    }),

    // GET /auth/logout
    logout(req, res, next) {
        if (req.session) {
            req.session.destroy(error => {
                if (error) return next(error);

                res.redirect('/');
            });
        }
    }
};