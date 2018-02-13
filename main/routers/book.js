const router = require('express').Router();

const { book: bookController, topic: topicController } = require('../controllers');

router.use(topicController.findTopics);

router.param('book', bookController.findBook);

router.get('/', bookController.showLatestBooks);
router.get('/new', bookController.showNewBooks);
router.get('/best', bookController.showBestBooks);
router.get('/search', bookController.showResults);
router.get('/:book', bookController.showBook);

module.exports = router;