const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const data = require('./shared/data');
const config = require('./shared/config');
const services = require('./shared/services');
const middleware = require('./shared/middleware');

const main = require('./main');
const admin = require('./admin');
const api = require('./api');

const server = express();

server.set('view engine', 'pug');
server.set('views', config.paths.views);
server.set('config', config);

server.locals.basedir = config.paths.views;
server.locals.VERSION = config.version;
server.locals.LANGUAGES = data.languages;

server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
server.use(favicon(config.paths.favicon));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(logger('dev'));
server.use(session({
    name: 'sessionId',
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        //signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    },
    store: new MongoStore({
        mongooseConnection: services.db.connection,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24 // 1 day
    })
}));

server.use(services.passport.initialize());
server.use(services.passport.session());

server.use('/', main);
server.use('/admin', admin);
server.use('/api', api);

server.use(middleware.error.notFound);
server.use(server.get('env') === 'development' ? middleware.error.development : middleware.error.production);

server.listen(config.port, () => console.log('Express:', config.port));