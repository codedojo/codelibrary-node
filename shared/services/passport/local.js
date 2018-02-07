const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../../models');

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

passport.use('local-register', new LocalStrategy(options, (req, email, password, done) => {
    if (password !== req.confirmPassword) return done(new Error('Пароли не совпадают'));

    User.create({ email, password })
        .then(user => done(null, user))
        .catch(done);
}));

passport.use('local-login', new LocalStrategy(options, (req, email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if (!user) return done(null, false);
            
            user.isCorrectPassword(password)
                .then(isEqual => {
                    if (!isEqual) return done(null, false);
                    console.log(user)
                    done(null, user);
                })
                .catch(done);
        })
        .catch(done);
}));