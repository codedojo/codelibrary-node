const path = require('path');

module.exports = {
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    sessionSecret: 'HacJmB3ma6crKKtK',
    mongodbUri: {
        local: 'mongodb://localhost:27017/codedojo',
        mlab: process.env.MONGODB_MLAB_URL
    },
    paths: {
        views: path.resolve(__dirname, '..', 'views'),
        public: path.resolve(__dirname, '..', 'public'),
        favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
        lib: path.resolve(__dirname, '..', 'node_modules')
    },
    oauth: {
        github: {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        }
    }
};