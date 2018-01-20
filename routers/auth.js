const router = require('express').Router();

const { auth: {
    showRegisterPage,
    showLoginPage,
    register,
    login
} } = require('../controllers');

router.route('/register')
    .get(showRegisterPage)
    .post(register);

router.route('/login')
    .get(showLoginPage)
    .post(login);

module.exports = router;