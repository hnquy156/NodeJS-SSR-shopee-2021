const express = require('express');
const router = express.Router();

const CartModel = require(__path_models + 'carts');
const ProductModel = require(__path_models + 'products');

const collectionName = 'carts'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Giỏ hàng';


/* GET API Products in Cart. */
router.get('/get-products/', async (req, res, next) => {
	res.send({data: res.locals.cartProducts});
});

/* GET Add product to cart. */
router.get('/:task/:cartID/:productID', async (req, res, next) => {
	const {task, productID, cartID} = req.params;
	const quantity = +req.query.quantity;
	
	const data = await CartModel.saveItem({productID, cartID, quantity}, {task});
	res.send(data);
});

/* GET cart page. */
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	// const cartItem = await ProductModel.getItem(id);
	// const cartProducts = await CartModel.getCartProducts(id, null);

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		// cartProducts: cartProducts.products
	});
});


module.exports = router;