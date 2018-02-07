const router = require('express').Router();

const { book: bookController } = require('../controllers');

router.param('id', bookController.book.find);

router.route('/')
    .get(bookController.books.get)
    .post(bookController.books.post);

router.route('/:id')
    .get(bookController.book.get)
    .put(bookController.book.put)
    .delete(bookController.book.delete);

router.route('/:id/likes')
    .put(bookController.book.likes.put);

module.exports = router;