const server = require('./server');
const port = server.get('port');

if (server.get('env') === 'development') {
    const fs = require('fs');
    const https = require('https');

    const ssl = {
        key: fs.readFileSync(__dirname + '/ssl/key.pem'),
        cert: fs.readFileSync(__dirname + '/ssl/cert.crt')
    };

    https.createServer(ssl, server).listen(port, () => console.log('Express:', port));
} else {
    server.listen(port, () => console.log('Express:', port));
}