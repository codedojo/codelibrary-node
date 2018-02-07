const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Publisher = new Schema({
    _id: String,
    title: String,
    description: String
});

Publisher.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'publisher'
});

Publisher.set('toJSON', { getters: true, versionKey: false });

Publisher.options.toJSON.transform = function(doc, ret, options) {
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('Publisher', Publisher);