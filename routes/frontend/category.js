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
	const titleCategory = 'Danh mục ' + categoryItem.name;
	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		products,
		titleCategory,
	});
});

/* GET filtered category page. */
router.get('/', async (req, res, next) => {
	const products = await ProductModel.getListFrontend({task: 'products-filter'}, req.query);
	const titleCategory = 'Kết quả tìm kiếm';

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		products,
		titleCategory,
		queryObj: req.query,
	});
});

module.exports = router;