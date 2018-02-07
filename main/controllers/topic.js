const { Topic } = require('../../shared/models');

module.exports = {
    findTopics(req, res, next) {
        Topic.find()
            .then(topics => {
                req.topics = topics;
                
                res.locals.topics = topics;

                next();
            })
            .catch(next);
    },

    findTopic(req, res, next, id) {
        Topic.findById(id)
            .then(topic => {
                topic.req = topic;

                next();
            })
            .catch(next);
    }
};