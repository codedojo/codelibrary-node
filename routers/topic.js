const router = require('express').Router();

const { book: { showBooksByTopic } } = require('../controllers');
const { topic: { findTopics } } = require('../middleware');

router.get('/:topic',
    findTopics,
    showBooksByTopic
);

module.exports = router;