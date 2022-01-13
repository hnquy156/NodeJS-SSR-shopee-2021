const express = require('express');
const router = express.Router();

const collectionName = 'category';
const ProductModel = require(__path_models + 'products');
const CategoryModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Category';

/* GET category page. */
router.get('/:slug', async (req, res, next) => {
	const categorySlug = req.params.slug;
	const categoryItem = await CategoryModel.getItemFrontend(categorySlug, null);
	const products 	   = await ProductModel.getListFrontend({task: 'products-in-category'}, categoryItem);

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		products,
		categoryItem,
	});
});

module.exports = router;