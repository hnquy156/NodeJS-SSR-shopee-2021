const express = require('express');
const router = express.Router();

const ArticlesMiddewares = require(__path_middlewares + 'articles');
const NotifyAuthenticationMiddewares = require(__path_middlewares + 'notify-auth');

router.use('/', require('./home'));
router.use('/articles', require('./articles'));
router.use('/category', require('./category'));
router.use('/rss', require('./rss'));
router.use('/contact', require('./contact'));
router.use('/auth', NotifyAuthenticationMiddewares, require('./auth'));

module.exports = router;
