const express = require('express');
const router = express.Router();

const collectionName = 'category';
const ProductModel = require(__path_models + 'products');
const CategoryModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
let pageTitle = 'Category';

/* GET category page. */
router.get('/:slug', async (req, res, next) => {
	const categorySlug = req.params.slug;
	const categoryItem = await CategoryModel.getItemFrontend(categorySlug, null);
	const titleCategory = 'Danh mục ' + categoryItem.name;
	const user = req.user;
	let task = 'products-in-category';
	if (categorySlug === 'yeu-thich') task = 'products-favourite';

	const products = await ProductModel.getListFrontend({task, user}, categoryItem);
	
	res.render(`${folderView}/index`, { 
		pageTitle: titleCategory, 
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
		pageTitle: titleCategory, 
		layout, 
		products,
		titleCategory,
		queryObj: req.query,
	});
});

module.exports = router;