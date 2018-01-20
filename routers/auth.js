const router = require('express').Router();

const { auth: { authenticated, unauthenticated } } = require('../middleware');
const { auth: controller } = require('../controllers');

router.route('/register')
    .all(unauthenticated)
    .get(controller.showRegisterPage)
    .post(controller.register);

router.route('/login')
    .all(unauthenticated)
    .get(controller.showLoginPage)
    .post(controller.login);

router.get('/logout', authenticated, controller.logout);

module.exports = router;