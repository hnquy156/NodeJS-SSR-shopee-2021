const express = require('express');
const router = express.Router();

const collectionName = 'contacts';
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/', MainController.index);
router.post('/', MainController.sendContact);
router.get('/success', MainController.success);


module.exports = router;