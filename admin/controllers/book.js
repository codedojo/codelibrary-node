const { book: Book } = require('../../models');

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

    showIndexPage(req, res, next) {
        Book.find()
            .then(books => {
                res.render('books', {
                    books
                });
            })
            .catch(next);
    },

    showCreatePage(req, res) {
        res.render('books/form', {
            book: new Book()
        });
    },

    showUpdatePage(req, res) {
        res.render('books/form', {
            book: req.book
        });
    },

    showDeletePage(req, res) {
        res.render('books/delete', {
            book: req.book
        });
    },

    createBook(req, res, next) {
        Book.create(req.body)
            .then(() => res.redirect('/admin/books'))
            .catch(next);
    },

    updateBook(req, res, next) {
        Book.findOneAndUpdate({ _id: req.topic.id }, req.body)
            .then(topic => res.redirect(`/admin/books/${topic.id}/update`))
            .catch(next);
    },

    deleteBook(req, res, next) {
        req.book.remove()
            .then(() => res.redirect('/admin/books'))
            .catch(next);
    }
};