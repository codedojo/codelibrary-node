const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..', '..');

module.exports = {
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    sessionSecret: 'HacJmB3ma6crKKtK',
    jwtSecret: '8UG^LmgL!!N#42vq',
    mongodbUri: {
        local: 'mongodb://localhost:27017/codedojo',
        mlab: process.env.MONGODB_MLAB_URL
    },
    paths: {
        views: path.join(ROOT_PATH, 'shared', 'views'),
        public: path.join(ROOT_PATH, 'shared', 'public'),
        favicon: path.join(ROOT_PATH, 'shared', 'public', 'favicon.ico'),
        lib: path.join(ROOT_PATH, 'node_modules')
    },
    oauth: {
        github: {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        }
    }
};