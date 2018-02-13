module.exports = {
    // GET /
    showCart(req, res, next) {
        req.cart.populate('items')
            .execPopulate()
            .then(cart => {
                res.render('cart', {
                    id: 'cart',
                    title: 'Корзина',
                    cart
                });
            })
            .catch(next);
    },

    // POST /cart
    addProduct(req, res) {
        req.cart.addProduct(req.body.productId);
        req.flash('success', 'Товар добавлен');

        res.redirect('back');
    },

    // GET /cart/remove?productId=value
    removeProduct(req, res) {
        req.cart.removeProduct(req.query.productId);
        req.flash('success', 'Товар удален');
        
        res.redirect('back');
    }
};