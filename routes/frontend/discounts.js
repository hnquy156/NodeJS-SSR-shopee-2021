const express = require('express');
const router = express.Router();

const collectionName = 'discounts';
const MainController = require(__path_controllers_frontend + collectionName);


/* GET discount code */
router.get('/:code', MainController.getDiscountCode);

module.exports = router;