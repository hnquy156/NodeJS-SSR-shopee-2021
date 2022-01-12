const express = require('express');
const router = express.Router();

const ArticlesMiddewares = require(__path_middlewares + 'products');
const NotifyAuthenticationMiddewares = require(__path_middlewares + 'notify-auth');

router.use('/', require('./home'));
router.use('/category', require('./category'));

module.exports = router;
