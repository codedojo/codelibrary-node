module.exports = function createFlashMiddleware(options) {
    return function flash(req, res, next) {
        req.flash = function(level = 'info', message) {
            req.session.flash = { level, message };
        };

        let flash = req.session.flash;
        req.session.flash = null;
        delete req.session.flash;
    
        res.locals.flash = flash;
    
        next();
    };
};