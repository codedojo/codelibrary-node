const router = require('express').Router();

const { book: {
    findBook,
    showLatestBooks,
    showNewBooks,
    showBestBooks,
    showBook
} } = require('../controllers');
const {
    topic: { findTopics },
} = require('../middleware');

router.use(findTopics);

router.get('/', showLatestBooks);
router.get('/new', showNewBooks);
router.get('/best', showBestBooks);
router.get('/:book', findBook, showBook);

module.exports = router;