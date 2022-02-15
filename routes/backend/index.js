const express = require('express');
const router = express.Router();

const AuthenticatedMiddleware = require(__path_middlewares + 'auth');

router.use('/', AuthenticatedMiddleware, require('./dashboard'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/contacts', require('./contacts'));
router.use('/settings', require('./settings'));
router.use('/discounts', require('./discounts'));
router.use('/deliveries', require('./deliveries'));
router.use('/orders', require('./orders'));
router.use('/sliders', require('./sliders'));

module.exports = router;
