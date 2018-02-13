const router = require('express').Router();

const { cart } = require('../controllers');

router.get('/', cart.showCart);
router.post('/', cart.addProduct);
router.get('/remove', cart.removeProduct);

module.exports = router;