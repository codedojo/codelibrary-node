const { user: User } = require('../models');

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
    register(req, res, next) {
        let { email, password, confirmPassword } = req.body;

        if (!email || !password) return next(new Error('Необходимо ввести email и пароль'));
        else if (password !== confirmPassword) return next (new Error('Пароли не совпадают'));

        User.create({ email, password })
            .then(user => {
                req.session.userId = user.id;
                res.redirect('/profile');
            })
            .catch(next);
    },

    // POST /auth/login
    login(req, res, next) {
        let { email, password } = req.body;
        
        if (!email || !password) {
            let error = new Error('Необходимо ввести логин и пароль');
            error.status = 401;
            return next(error);
        }

        User.authenticate(email, password)
            .then(user => {
                req.session.userId = user.id;
                res.redirect('/profile');
            })
            .catch(next);
    },

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