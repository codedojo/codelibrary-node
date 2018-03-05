module.exports = function ensureNoWww() {
    return (req, res, next) => {
        let host = req.hostname;
        
        if (host.match(/^www\./) !== null) {
            res.redirect(301, req.protocol + '://' + host.replace(/^www\./, '') + req.originalUrl);
        } else {
            next();
        }
    };
};