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

                req.book = book;

                next();
            })
            .catch(next);
    },

    // GET /books
    showLatestBooks(req, res, next) {
        Book.find()
            .then(books => {
                res.render('books', {
                    id: 'books',
                    title: 'CodeLibrary',
                    books
                });
            })
            .catch(next);
    },

    // GET /books/new
    showNewBooks(req, res, next) {
        Book.find()
            .sort({ date: -1 })
            .limit(9)
            .then(books => {
                res.render('books', {
                    id: 'books',
                    title: 'Книги',
                    books
                });
            })
            .catch(next);
    },

    // GET /books/best
    showBestBooks(req, res, next) {
        Book.find()
            .sort({ likes: -1 })
            .limit(9)
            .then(books => {
                res.render('books', {
                    id: 'books',
                    title: 'Книги',
                    books
                });
            })
            .catch(next);
    },

    // GET /topics/:topic
    showBooksByTopic(req, res, next) {
        Topic.findById(req.params.topic)
            .populate('books')
            .then(topic => {
                res.render('books', {
                    id: 'books',
                    title: `Книги по ${topic.title}`,
                    books: topic.books
                });
            })
            .catch(next);
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