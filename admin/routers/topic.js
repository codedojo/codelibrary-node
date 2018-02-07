const router = require('express').Router();

const { topic: topicController } = require('../controllers');

router.param('topic', topicController.findTopic);

router.get('/', topicController.showIndexPage);

router.route('/create')
    .get(topicController.showCreatePage)
    .post(topicController.createTopic);

router.route('/:topic/update')
    .get(topicController.showUpdatePage)
    .post(topicController.updateTopic);

router.route('/:topic/delete')
    .get(topicController.showDeletePage)
    .post(topicController.deleteTopic);

module.exports = router;