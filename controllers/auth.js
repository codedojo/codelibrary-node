module.exports = {
    // GET /auth/register
    showRegisterPage(req, res) {
        res.render('auth/register', {
            id: 'register',
            className: 'auth-page',
            title: 'Регистрация'
        });
    },

    // POST /auth/register
    register(req, res) {
        // TODO: Register user
    },

    // GET /auth/login
    showLoginPage(req, res) {
        res.render('auth/login', {
            id: 'login',
            className: 'auth-page',
            title: 'Вход'
        });
    },

    // POST /auth/login
    login(req, res) {
        // TODO: Log user in
    },

    logout(req, res) {
        // TODO: Log user out
    }
};