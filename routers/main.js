'use strict';

const router = require('express').Router();

const { main } = require('../controllers');

router.get('/', main.showMain);

module.exports = router;