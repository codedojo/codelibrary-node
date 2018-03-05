const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Поле Email обязательно для заполнения.'],
        unique: true,
        trim: true,
        minlength: [7, 'Адрес электронный почты слишком короткий.'],
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    password: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    firstname: { type: String },
    lastname: { type: String },
    photo: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, {
    timestamps: true
});

User.virtual('displayName').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

User.virtual('isAdmin').get(function() {
    return this.role === 'admin';
});

User.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next);
});

User.post('save', function(error, user, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Имя пользователя или адрес электронной почты заняты.'));
    } else {
        next(error);
    }
});

User.methods.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);