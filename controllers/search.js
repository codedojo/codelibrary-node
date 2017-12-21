'use strict';

module.exports = {
    // GET /search?query=value
    showResults(req, res) {
        res.send(`Показать результаты поиска по запросу ${JSON.stringify(req.query)}`);
    }
};