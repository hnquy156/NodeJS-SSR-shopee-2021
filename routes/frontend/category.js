const express = require('express');
const router = express.Router();

const collectionName = 'category';
const ArticlesModel = require(__path_models + 'articles');
const CategoriesModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Category';

/* GET category page. */
router.get('/:categoryID', async (req, res, next) => {
	const id = req.params.categoryID;
	const categoryArticles = await ArticlesModel.getListFrontend({task: 'articles-in-category'}, {id: id});
	const currentCategory = await CategoriesModel.getItem(id);

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		categoryArticles,
		currentCategory,
	});
});

module.exports = router;