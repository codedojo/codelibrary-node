const mongoose = require('mongoose');
const router = require('express').Router();

const Book = mongoose.model('Book');
const bookController = require('../controllers').book(Book);

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