module.exports = function ensureHttps() {
    return (req, res, next) => {
        if (req.secure) next();
        else {
            if (req.method === 'GET')
                res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
            else
                res.status(403).send('Для доступа к сайту необходимо использовать защищенное соединение через HTTPS.');
        }
    };
};