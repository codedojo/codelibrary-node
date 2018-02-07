const router = require('express').Router();

const {
    book: bookController,
    topic: topicController
} = require('../controllers');

router.param('book', bookController.findBook);

router.get('/', bookController.showIndexPage);

router.route('/create')
    .get(
        topicController.findTopics,
        bookController.showCreatePage
    )
    .post(bookController.createBook);

router.route('/:book/update')
    .get(
        topicController.findTopics,
        bookController.showUpdatePage
    )
    .post(bookController.updateBook);

router.route('/:book/delete')
    .get(bookController.showDeletePage)
    .post(bookController.deleteBook);

module.exports = router;