const router = require('express').Router();

const { auth: {
    showRegisterPage,
    showLoginPage
} } = require('../controllers');

router.get('/register', showRegisterPage);
router.get('/login', showLoginPage);

module.exports = router;