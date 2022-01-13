const express = require('express');
const router = express.Router();

const ProductModel = require(__path_models + 'products');

const collectionName = 'products'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Products';

/* GET home page. */
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	
	const productItem  = await ProductModel.getItemFrontend(id);
	const products 	   = await ProductModel.getListFrontend({task: 'products-in-category'}, {id: productItem.group.id});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		productItem,
		products,
	});
});

module.exports = router;