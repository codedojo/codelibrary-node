router.get('/profile', (req, res, next) => {
    if (!req.session.userId) {
        let error = new Error();
        error.status = 403;
        return next(error);
    }

    User.findById(req.session.userId)
        .then(user => {
            res.render('/profile', {
                id: 'profile',
                title: 'Профиль',
                user
            });
        })
        .catch(next);
});