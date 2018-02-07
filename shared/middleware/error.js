const { NotFoundError } = require('../utils/error');

module.exports = {
    notFound(req, res, next) {
        next(new NotFoundError());
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