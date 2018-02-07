const router = require('express').Router();

const { home: homeController } = require('../controllers');

router.get('/', homeController.showIndexPage);

module.exports = router;