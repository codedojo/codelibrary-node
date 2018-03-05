const express = require('express');
const path = require('path');
const csurf = require('csurf');

const { csrf } = require('../shared/middleware');
const middleware = require('./middleware');
const routers = require('./routers');

const main = express();

main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

main.on('mount', server => {
    main.locals = Object.assign(server.locals, main.locals);
});

main.use(csurf(), csrf);

main.use((req, res, next) => {
    res.locals.user = req.user;

    next();
});

main.use('/', routers.main);
main.use('/auth', routers.auth);
main.use(middleware.auth.allowAuthenticated);
main.use('/user', routers.user);
main.use('/books', routers.book);
main.use('/topics', routers.topic);
main.use('/cart', routers.cart);

module.exports = main;