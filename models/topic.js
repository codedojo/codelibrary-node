const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Topic = new Schema({
    _id: String,
    title: String,
    description: String
});

Topic.virtual('slug').get(function() {
    return this._id;
});

Topic.virtual('url').get(function () {
    return `/topics/${this._id}`;
});

Topic.virtual('image').get(function () {
    return `/img/topics/${this._id}.svg`;
});

Topic.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'topics'
});

module.exports = mongoose.model('Topic', Topic);