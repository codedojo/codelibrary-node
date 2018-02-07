const { Book} = require('../../shared/models');

module.exports = {
    findBook(req, res, next, id) {
        Book.findById(id)
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

    // GET /admin/books
    showIndexPage(req, res, next) {
        Book.find()
            .then(books => {
                res.render('books', {
                    books
                });
            })
            .catch(next);
    },

    // GET /admin/books/create
    showCreatePage(req, res) {
        res.render('books/form', {
            book: new Book(),
            topics: req.topics
        });
    },

    // GET /admin/books/:book/update
    showUpdatePage(req, res) {
        res.render('books/form', {
            book: req.book,
            topics: req.topics
        });
    },

    // GET /admin/books/:book/update
    showDeletePage(req, res) {
        res.render('books/delete', {
            book: req.book
        });
    },

    // POST /admin/books
    createBook(req, res, next) {
        Book.create(req.body)
            .then(() => res.redirect('/admin/books'))
            .catch(next);
    },

    // POST /admin/books/:book/update
    updateBook(req, res, next) {
        Book.findOneAndUpdate({ _id: req.book.id }, Book.validateBody(req.body), { new: true })
            .then(book => res.redirect(`/admin/books/${book.id}/update`))
            .catch(next);
    },

    // POST /admin/books/:book/update
    deleteBook(req, res, next) {
        req.book.remove()
            .then(() => res.redirect('/admin/books'))
            .catch(next);
    }
};