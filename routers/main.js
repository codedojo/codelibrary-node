const router = require('express').Router();

const { main: { showMain } } = require('../controllers');

router.get('/', showMain);

module.exports = router;