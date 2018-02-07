module.exports = {
    NotFoundError: class NotFoundError extends Error {
        constructor(message = 'Не найдено') {
            super(message);

            this.name = 'NotFoundError';
            this.status = 404;
        }
    }
};