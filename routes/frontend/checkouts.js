const express = require('express');
const router = express.Router();

const collectionName = 'checkouts';
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/:id', MainController.index);

module.exports = router;