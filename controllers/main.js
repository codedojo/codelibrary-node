module.exports = {
    // GET /
    showMain(req, res, next) {
        res.render('index', {
            id: 'main',
            title: 'CodeLibrary'
        });
    }
};