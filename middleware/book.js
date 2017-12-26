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
    }
};