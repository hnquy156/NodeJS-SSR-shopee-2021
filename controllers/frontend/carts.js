const CartModel = require(__path_models + 'carts');

const collectionName = 'carts'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Giỏ hàng';

module.exports = {
	getProducts: async (req, res, next) => {
		res.send({data: res.locals.cartProducts});
	},
	addProductsToCart: async (req, res, next) => {
		const {task, productID, cartID} = req.params;
		const quantity = +req.query.quantity;
		
		const data = await CartModel.saveItem({productID, cartID, quantity}, {task});
		res.send(data);
	},
	index: async (req, res, next) => {
		res.render(`${folderView}/index`, { 
			pageTitle, 
			layout, 
		});
	}
}