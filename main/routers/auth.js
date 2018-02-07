const router = require('express').Router();

const { auth: authMiddleware } = require('../middleware');
const {
    auth: authController,
    oauth: oauthController
} = require('../controllers');

router.route('/register')
    .all(authMiddleware.allowUnauthenticated)
    .get(authController.showRegisterPage)
    .post(authController.register);

router.route('/login')
    .all(authMiddleware.allowUnauthenticated)
    .get(authController.showLoginPage)
    .post(authController.login);

router.get('/github', oauthController.github.authenticate);
router.get('/github/callback', oauthController.github.callback);

router.get('/logout', authMiddleware.allowAuthenticated, authController.logout);

module.exports = router;