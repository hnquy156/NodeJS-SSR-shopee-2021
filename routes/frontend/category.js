const express = require('express');
const router = express.Router();

const collectionName = 'category';
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/:slug', MainController.index);
router.get('/', MainController.filter);

module.exports = router;