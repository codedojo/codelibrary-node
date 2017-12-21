'use strict';

const express = require('express');

const config = require('./config');
const routers = require('./routers');

const app = express();

app.use(express.static(config.paths.public));

app.use('/', routers.main);
app.use('/books', routers.books);
app.use('/search', routers.search);

app.listen(config.port, () => console.log('Express:', config.port));