const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
    timestamps: true
});

Cart.methods.calculateTotal = function() {
    return this.items.reduce((total, item) => item.price + total, 0);
};

Cart.methods.addProduct = function(productId) {
    this.items.addToSet(productId);

    return this.save();
};

Cart.methods.removeProduct = function(productId) {
    this.items.pull(productId);

    return this.save();
};

module.exports = mongoose.model('Cart', Cart);