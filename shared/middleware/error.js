const { NotFoundError } = require('../utils/error');

module.exports = {
    notFound(req, res, next) {
        next(new NotFoundError());
    },

    csrf(err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        // handle CSRF token errors here
        res.status(403);
        res.send('form tampered with');
    },

    development(error, req, res, next) {
        console.error(error);

        res.status(error.status).render('error', {
            id: 'error',
            title: 'Ошибка',
            error
        });
    },

    production(error, req, res, next) {
        res.status(error.status).render('error', {
            id: 'error',
            title: 'Ошибка',
            message: error.message
        });
    }
};