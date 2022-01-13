const express = require('express');
const router = express.Router();

const ProductModel = require(__path_models + 'products');

const collectionName = 'checkouts'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Check Out';

/* GET home page. */
router.get('/', async (req, res, next) => {
	// const id = req.params.id;
	
	// const productItem = await ProductModel.getItemFrontend(id);
	// const products = await ProductModel.getListFrontend({task: 'products-new'}, null);

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
	});
});

module.exports = router;