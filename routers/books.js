'use strict';

const router = require('express').Router();

const { books } = require('../controllers');

router.get('/', books.showAllBooks);
router.get('/:topic', books.showBooksByTopic);
router.get('/:topic/:book', books.showBook);

module.exports = router;