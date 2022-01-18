const express = require('express');
const router = express.Router();

const productsMiddeware = require(__path_middlewares + 'products');
const NotifyAuthenticationMiddewares = require(__path_middlewares + 'notify-auth');

router.use('/', productsMiddeware, require('./home'));
router.use('/category', require('./category'));
router.use('/products', require('./products'));
router.use('/contacts', require('./contacts'));
router.use('/carts', require('./carts'));
router.use('/checkouts', require('./checkouts'));
router.use('/discounts', require('./discounts'));
router.use('/deliveries', require('./deliveries'));

module.exports = router;
