const { Book } = require('../../shared/models');

module.exports = {
    books: {
        // GET /api/books
        get(req, res, next) {
            Book.find()
                .then(books => res.status(200).json(books))
                .catch(next);
        },

        // POST /api/books
        post(req, res, next) {
            Book.create(req.body)
                .then(book => res.status(201).json(book))
                .catch(next);
        }
    },

    book: {
        find(req, res, next, id) {
            Book.findById(id)
                .then(book => {
                    if (!book) return res.sendStatus(404);
                    req.book = book;
                    next();
                })
                .catch(next);
        },

        // GET /api/books/:id
        get(req, res) {
            res.send(req.book);
        },

        // PUT /api/books/:id
        put(req, res, next) {
            req.book = Object.assign(req.book, req.body);
            
            req.book.save()
                .then(book => res.status(201).json(book))
                .catch(next);
        },

        // DELETE /api/books/:id
        delete(req, res, next) {
            req.book.remove()
                .then(() => res.sendStatus(204))
                .catch(next);
        },

        likes: {
            put(req, res, next) {
                req.book.likes += 1;

                req.book.save()
                    .then(book => res.status(201).json(book.likes))
                    .catch(next);
            }
        }
    }
};