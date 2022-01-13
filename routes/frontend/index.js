const express = require('express');
const router = express.Router();

const ArticlesMiddewares = require(__path_middlewares + 'products');
const NotifyAuthenticationMiddewares = require(__path_middlewares + 'notify-auth');

router.use('/', require('./home'));
router.use('/category', require('./category'));
router.use('/products', require('./products'));
router.use('/contacts', require('./contacts'));
router.use('/carts', require('./carts'));
router.use('/checkouts', require('./checkouts'));

module.exports = router;
