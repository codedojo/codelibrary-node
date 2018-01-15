const router = require('express').Router();

const { publisher: controller } = require('../controllers');

router.param('publisher', controller.findPublisher);

router.get('/', controller.showIndexPage);

router.route('/create')
    .get(controller.showCreatePage)
    .post(controller.createPublisher);

router.route('/:publisher/update')
    .get(controller.showUpdatePage)
    .post(controller.updatePublisher);

router.route('/:publisher/delete')
    .get(controller.showDeletePage)
    .post(controller.deletePublisher);

module.exports = router;