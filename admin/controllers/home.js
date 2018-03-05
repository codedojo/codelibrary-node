module.exports = {
    showIndexPage(req, res) {
        res.render('index', {
            id: 'admin'
        });
    }
};