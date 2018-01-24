const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { db, passport } = require('./services');
const config = require('./config');
const { error, auth } = require('./middleware');
const routers = require('./routers');
const admin = require('./admin');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.paths.views);
app.set('config', config);

app.locals.version = config.version;
app.locals.basedir = config.paths.views;

app.use(express.static(config.paths.public));
app.use('/lib', express.static(config.paths.lib));
app.use(express.urlencoded({ extended: false }));

app.use(favicon(config.paths.favicon));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'sessionId',
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    },
    store: new MongoStore({
        mongooseConnection: db.connection,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24 // 1 day
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;

    next();
});

app.use('/', routers.main);
app.use('/auth', routers.auth);

app.use(auth.authenticated);
app.use('/profile', routers.profile);
app.use('/books', routers.book);
app.use('/topics', routers.topic);
app.use('/search', routers.search);
app.use('/admin', admin);

app.use(error.notFound);
app.use(app.get('env') === 'development' ? error.development : error.production);

app.listen(config.port, () => console.log('Express:', config.port));