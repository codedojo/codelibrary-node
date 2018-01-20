const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');

require('./services/db');

const config = require('./config');
const { error } = require('./middleware');
const routers = require('./routers');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.paths.views);
app.set('config', config);

app.locals.version = config.version;

app.use(express.static(config.paths.public));
app.use('/lib', express.static(config.paths.lib));
app.use(favicon(config.paths.favicon));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use('/', routers.main);
app.use('/auth', routers.auth);
app.use('/books', routers.book);
app.use('/topics', routers.topic);
app.use('/search', routers.search);

app.use(error.notFound);
app.use(app.get('env') === 'development' ? error.development : error.production);

app.listen(config.port, () => console.log('Express:', config.port));