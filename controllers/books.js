'use strict';

module.exports = {
    // GET /books
    showAllBooks(req, res) {
        res.send('Показать все книги');
    },

    // GET /books/:topic
    showBooksByTopic(req, res) {
        res.send(`Показать книги по теме ${req.params.topic}`);
    },

    // GET /books/:topic/:book
    showBook(req, res) {
        res.send('Показать книгу');
    }
};