const mongoose = require('mongoose');
const moment = require('moment');

const splitByComma = require('../utils/format').splitBy(',');

const Schema = mongoose.Schema;

const Book = new Schema({
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    authors: { type: [String], required: true },
    publisher: { type: String, ref: 'Publisher' },
    date: { type: Date, default: Date.now, get: value => moment(value) },
    edition: { type: Number, default: 1, min: 1 },
    pages: { type: Number, min: 0, default: 0 },
    language: { type: String, enum: ['en', 'ru'] },
    level: { type: String, enum: ['beg', 'int', 'adv'] },
    topics: [{ type: String, ref: 'Topic' }],
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    url: String,
    imageUrl: String,
    codeUrl: String,
    githubUrl: String,
    description: { type: String, default: '', trim: true },
    contents: { type: String, default: '', trim: true }
}, {
    toObject: { getters: false, virtuals: false },
    toJSON: { versionKey: false, getters: false },
    timestamps: true
});

Book.options.toJSON.transform = function(doc, obj) {
    delete obj._id;
    return obj;
};

Book.statics.validateBody = function(body) {
    return Object.assign(body, {
        authors: splitByComma(body.authors),
        tags: splitByComma(body.tags)
    });
};

module.exports = mongoose.model('Book', Book);