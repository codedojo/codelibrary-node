const { topic: Topic } = require('../../models');

module.exports = {
    findTopic(req, res, next, id) {
        Topic.findById(id)
            .then(topic => {
                req.topic = topic;

                next();
            })
            .catch(next);
    },

    showIndexPage(req, res, next) {
        Topic.find()
            .then(topics => {
                res.render('topics', { topics });
            })
            .catch(next);
    },

    showCreatePage(req, res) {
        res.render('topics/form', {
            topic: new Topic()
        });
    },

    showUpdatePage(req, res) {
        res.render('topics/form', {
            topic: req.topic
        });
    },

    showDeletePage(req, res) {
        res.render('topics/delete', {
            topic: req.topic
        });
    },

    createTopic(req, res, next) {
        Topic.create({
            _id: req.body.id,
            title: req.body.title
        })
            .then(() => res.redirect('/admin/topics'))
            .catch(next);
    },

    updateTopic(req, res, next) {
        Topic.findOneAndUpdate({ _id: req.topic.id }, req.body)
            .then(topic => res.redirect('/admin/topics'))
            .catch(next);
    },

    deleteTopic(req, res, next) {
        req.topic.remove()
            .then(() => res.redirect('/admin/topics'))
            .catch(next);
    }
};