const express = require('express');
const router = express.Router();

const collectionName = 'carts'
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/get-products/', MainController.getProducts);
router.get('/:task/:cartID/:productID', MainController.addProductsToCart);
/* GET cart page. */
router.get('/:id', MainController.index);


module.exports = router;