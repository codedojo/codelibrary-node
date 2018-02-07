module.exports = {
    // GET /
    showMain(req, res) {
        res.render('index', {
            id: 'main',
            title: 'CodeLibrary'
        });
    }
};