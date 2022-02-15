const express = require('express');
const router = express.Router();

const collectionName = 'settings';
const MainController = require(__path_controllers_admin + collectionName);


router.get('/', MainController.getForm);
router.post('/', MainController.postForm);

module.exports = router;
