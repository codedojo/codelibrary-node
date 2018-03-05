module.exports = function flash(req, res, next) {
    res.locals.errors = req.flash('error');

    next();
};