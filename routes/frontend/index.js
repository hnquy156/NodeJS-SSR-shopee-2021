const express = require('express');
const router = express.Router();

const productsMiddeware              = require(__path_middlewares + 'products');
const NotifyAuthenticationMiddewares = require(__path_middlewares + 'notify-auth');
const AuthUserMdw = require(__path_middlewares + 'auth-user');

router.use('/', productsMiddeware, require('./home'));
router.use('/auth', NotifyAuthenticationMiddewares, require('./auth'));
router.use('/category', require('./category'));
router.use('/products', require('./products'));
router.use('/contacts', require('./contacts'));
router.use('/carts', AuthUserMdw, require('./carts'));
router.use('/checkouts', AuthUserMdw, require('./checkouts'));
router.use('/discounts', require('./discounts'));
router.use('/deliveries', require('./deliveries'));
router.use('/orders', require('./orders'));

module.exports = router;
