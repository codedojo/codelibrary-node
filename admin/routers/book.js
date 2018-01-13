const router = require('express').Router();

const { book: controller } = require('../controllers');

router.param('book', controller.findBook);

router.get('/', controller.showIndexPage);

router.route('/create')
    .get(controller.showCreatePage)
    .post(controller.createBook);

router.route('/:book/update')
    .get(controller.showUpdatePage)
    .post(controller.updateBook);

router.route('/:book/delete')
    .get(controller.showDeletePage)
    .post(controller.deleteBook);

module.exports = router;