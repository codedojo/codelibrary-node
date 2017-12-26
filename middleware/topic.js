const topics = require('../data/topics').sort((current, next) => {
    if (current.id === next.id) return 0;
    if (current.id > next.id) return 1;
    if (current.id < next.id) return 0;
});

module.exports = {
    findTopics(req, res, next) {
        req.topics = topics;
        req.topic = topics.find(topic => topic.id === req.params.topic);
        
        res.locals.topics = topics;
        res.locals.currentTopic = req.topic;
        
        next();
    }
};