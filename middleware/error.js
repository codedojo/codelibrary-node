module.exports = {
    notFound(req, res, next) {
        let error = new Error('Не найдено');
        error.status = 404;

        next(error);
    },

    development(error, req, res, next) {
        console.error(error);

        res.render('error', {
            id: 'error',
            title: 'Ошибка',
            error
        });
    },

    production(error, req, res, next) {
        res.render('error', {
            id: 'error',
            title: 'Ошибка',
            message: error.message
        });
    }
};