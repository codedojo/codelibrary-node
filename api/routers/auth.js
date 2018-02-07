const router = require('express').Router();
const jwt = require('jwt-simple');

const { jwtSecret } = require('../../shared/config');
const { User } = require('../../shared/models');

router.post('/token', (req, res, next) => {
    if (!req.body.email || !req.body.password) return res.sendStatus(401);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.sendStatus(401);
            if (!user.isCorrectPassword(req.body.password)) return res.sendStatus(201);

            let payload = { id: user.id };
            let token = jwt.encode(payload, jwtSecret);

            res.json({ token });
        })
        .catch(next);
});

module.exports = router;