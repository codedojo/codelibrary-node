const router = require('express').Router();

const { book: bookController, topic: topicController } = require('../controllers');

router.get('/:topic',
    topicController.findTopics,
    bookController.showBooksByTopic
);

module.exports = router;