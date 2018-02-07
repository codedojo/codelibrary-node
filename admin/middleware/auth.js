const { NotFoundError } = require('../../shared/utils/error');

module.exports = {
    allowAdmin(req, res, next) {
        if (req.user.isAdmin) return next();
        
        next(new NotFoundError());
    }
};