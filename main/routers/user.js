const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile', {
        id: 'profile',
        title: 'Профиль',
        user: req.user
    });
});

module.exports = router;