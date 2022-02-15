const express = require('express');
const router = express.Router();

const collectionName = 'home';
const MainController = require(__path_controllers_frontend + collectionName);

/* GET home page. */
router.get('/', MainController.index);

module.exports = router;