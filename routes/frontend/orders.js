const express = require('express');
const router = express.Router();

const collectionName = 'orders';
const MainController = require(__path_controllers_frontend + collectionName);


/* GET ORDER PAGE */
router.get('/', MainController.index);
/* GET ORDER DATA */
router.get('/:code', MainController.getOrder);
/* POST NEW ORDER */
router.post('/add', MainController.addOrder);

module.exports = router;