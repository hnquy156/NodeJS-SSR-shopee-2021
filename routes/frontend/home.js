const express = require('express');
const router = express.Router();

const ProductModel = require(__path_models + 'products');
const CategoryModel = require(__path_models + 'categories');

const collectionName = 'home';
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Home';

/* GET home page. */
router.get('/', async (req, res, next) => {
	const products = await ProductModel.getListFrontend({task: 'products-new'}, null);
	const categories = await CategoryModel.getListFrontend({task: 'categories-list'}, null);
	
	res.render(`${folderView}/index`, { 
		layout,
		pageTitle, 
		products,
		categories,
	});
});

module.exports = router;