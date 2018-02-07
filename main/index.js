const express = require('express');
const path = require('path');

const middleware = require('./middleware');
const routers = require('./routers');

const main = express();

main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

main.on('mount', server => {
    main.locals = Object.assign(server.locals, main.locals);
});

main.use((req, res, next) => {
    res.locals.user = req.user;

    next();
});

main.use('/', routers.main);
main.use('/auth', routers.auth);
main.use('/user', middleware.auth.allowAuthenticated, routers.user);
main.use('/books', routers.book);
main.use('/topics', routers.topic);
main.use('/search', routers.search);

module.exports = main;