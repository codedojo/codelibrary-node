const router = require('express').Router();

const { auth: { authenticated, unauthenticated } } = require('../middleware');
const {
    auth: authController,
    oauth: oauthController
} = require('../controllers');

router.route('/register')
    .all(unauthenticated)
    .get(authController.showRegisterPage)
    .post(authController.register);

router.route('/login')
    .all(unauthenticated)
    .get(authController.showLoginPage)
    .post(authController.login);

router.get('/github', oauthController.github.authenticate);
router.get('/github/callback', oauthController.github.callback);

router.get('/logout', authenticated, authController.logout);

module.exports = router;