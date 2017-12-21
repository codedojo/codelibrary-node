'use srtict';

const path = require('path');

module.exports = {
    port: 3000,
    paths: {
        public: path.resolve(__dirname, '..', 'public')
    }
};