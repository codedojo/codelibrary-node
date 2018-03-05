const path = require('path');

const env = process.env.NODE_ENV;
const ROOT_PATH = path.resolve(__dirname, '..', '..');

module.exports = {
    version: process.env.APP_VERSION,
    env,
    port: process.env.PORT || 3001,
    sessionSecret: 'HacJmB3ma6crKKtK',
    jwtSecret: '8UG^LmgL!!N#42vq',
    mongodbUri: env === 'development' ? 'mongodb://localhost:27017/codedojo' : process.env.MONGODB_URL,
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