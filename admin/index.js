const express = require('express');
const path = require('path');

const middleware = require('./middleware');
const routers = require('./routers');

const admin = express();

admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'pug');

admin.on('mount', server => {
    admin.locals = Object.assign(server.locals, admin.locals);
});

admin.use(middleware.auth.allowAdmin);

admin.use('/', routers.home);
admin.use('/books', routers.book);
admin.use('/topics', routers.topic);

module.exports = admin;