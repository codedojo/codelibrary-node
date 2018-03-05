const passport = require('passport');
const { Strategy: GitHubStrategy } = require('passport-github');
const { User } = require('../../models');

const config = require('../../config');

passport.use(new GitHubStrategy(config.oauth.github, (accessToken, refreshToken, profile, done) => {
    if (!profile.emails) return done(null, false, { message: 'Для входа необходимо получить от GitHub email' });

    let [firstname, lastname] = profile.displayName ? profile.displayName.split(' ') : [];
    let email = profile.emails[0].value;
    let username = profile.username;
    let photo = profile.photos[0].value;

    User.findOneAndUpdate({ email }, {
        firstname,
        lastname,
        email,
        username,
        photo
    }, { 
        upsert: true,
        new: true
    }, done);
}));