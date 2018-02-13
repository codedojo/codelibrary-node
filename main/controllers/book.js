const { Book, Topic } = require('../../shared/models');

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

    // GET /books/search?query=value
    showResults(req, res, next) {
        let regex = new RegExp(req.query.query, 'gi');
        let { skip = 0, limit = 0 } = req.query;
        
        Book.find({
            $or: [
                { title: regex },
                { authors: regex },
                { topics: regex },
                { tags: regex }
            ]
        })
            .skip(Number(skip))
            .limit(Number(limit))
            .then(books => {
                res.render('books', {
                    id: 'book-search',
                    title: `Результаты поиска по запрос: ${req.query.query}`,
                    query: req.query.query,
                    books
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