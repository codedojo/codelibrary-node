'use strict';

const router = require('express').Router();

const { search } = require('../controllers');

router.get('/', search.showResults);

module.exports = router;