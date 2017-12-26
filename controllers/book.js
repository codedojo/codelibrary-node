const books = require('../data/books');

module.exports = {
    findBook(req, res, next) {
        let bookSlug = req.params.book;
        let book = books.find(book => book.slug === bookSlug);

        if (!book) {
            let error = new Error('Книга не найдена');
            error.status = 404;
            next(error);
        } else {
            req.book = book;

            next();
        }
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
        let booksByTopic = books.filter(book => book.topics.includes(req.topic.id));
        
        res.render('books', {
            id: 'books',
            title: `Книги по ${req.topic.title}`,
            books: booksByTopic
        });
    },

    // GET /books/:book
    showBook(req, res) {
        res.render('book', {
            id: 'book',
            title: req.book.title,
            book: req.book
        });
    }
};