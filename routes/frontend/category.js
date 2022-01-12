const express = require('express');
const router = express.Router();

const collectionName = 'category';
const ProductModel = require(__path_models + 'products');
const CategoriesModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Category';

/* GET category page. */
router.get('/:categoryID', async (req, res, next) => {
	const id = req.params.categoryID;
	const products = await ProductModel.getListFrontend({task: 'products-new'}, null);

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		products,
	});
});

module.exports = router;