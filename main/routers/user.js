const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('user', {
        id: 'user',
        title: 'Профиль',
        user: req.user
    });
});

module.exports = router;