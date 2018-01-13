const router = require('express').Router();

const { topic: controller } = require('../controllers');

router.param('topic', controller.findTopic);

router.get('/', controller.showIndexPage);

router.route('/create')
    .get(controller.showCreatePage)
    .post(controller.createTopic);

router.route('/:topic/update')
    .get(controller.showUpdatePage)
    .post(controller.updateTopic);

router.route('/:topic/delete')
    .get(controller.showDeletePage)
    .post(controller.deleteTopic);

module.exports = router;