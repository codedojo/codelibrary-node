const { Cart } = require('../../shared/models');

module.exports = function cart(req, res, next) {
    if (!req.session) throw new Error('Session is required. Try installing `npm install express-session`');

    if (req.session.cartId) {
        Cart.findById(req.session.cartId)
            .then(cart => {
                req.cart = cart;

                next();
            })
            .catch(next);
    } else {
        Cart.create({})
            .then(cart => {
                req.session.cartId = cart.id;
                req.cart = cart;

                next();
            })
            .catch(next);
    }
};