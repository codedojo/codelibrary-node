const { topic: Topic } = require('../models');

module.exports = {
    findTopics(req, res, next) {
        Topic.find()
            .then(topics => {
                req.topics = topics;
                
                res.locals.topics = topics;

                next();
            })
            .catch(next);
    }
};