const books = require('../data/books');
const { book: Book, topic: Topic } = require('../models');

module.exports = {
    findBook(req, res, next, slug) {
        Book.findOne({ slug })
            .populate('publisher')
            .then(book => {
                if (!book) {
                    let error = new Error('Книга не найдена');
                    error.status = 404;
                    throw error;
                }

                console.log(book);
                req.book = book;

                next();
            })
            .catch(next);
    },

    // GET /books
    showLatestBooks(req, res) {
        res.render('books', {
            id: 'books',
            title: 'CodeLibrary',
            books
        });
    },

    // GET /books/new
    showNewBooks(req, res) {
        res.render('books', {
            id: 'books',
            title: 'Новые книги',
            books
        });
    },

    // GET /books/best
    showBestBooks(req, res) {
        res.render('books', {
            id: 'books',
            title: 'Лучшие книги',
            books: books.sort((current, next) => next.likes - current.likes)
        });
    },

    // GET /topics/:topic
    showBooksByTopic(req, res) {
        Topic.findById(req.params.topic)
            .populate('book')
            .then(topic => {
                console.log(topic.books);
                res.render('books', {
                    id: 'books',
                    title: `Книги по ${req.topic.title}`,
                    books: topic.books
                });
            });
    },

    // GET /books/:book
    showBook(req, res) {
        res.render('books/book', {
            id: 'book',
            title: req.book.title,
            book: req.book
        });
    }
};